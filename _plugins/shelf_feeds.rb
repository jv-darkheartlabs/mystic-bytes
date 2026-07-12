# frozen_string_literal: true

require "cgi"
require "time"

module DarkHeartLabs
  class FeedPage < Jekyll::Page
    def read_yaml(*)
      @data ||= {}
    end
  end

  # Custom Atom feeds for large collections (readings, films).
  # jekyll-feed defaults to 10 items and generic excerpts — this generator
  # publishes full rendered HTML, proper summaries, and shelf-aware sorting.
  class ShelfFeeds < Jekyll::Generator
    safe true
    priority :lowest

    FEEDS = {
      "readings" => {
        "path" => "/readings-feed.xml",
        "title" => "Literary Analysis",
        "subtitle" => "Book reviews as critical essays — dark romance, trope, craft, and the ethics of desire.",
        "limit" => 100,
        "hidden_data_key" => "shelf_exclusions",
        "hidden_slug_key" => "hidden_slugs",
        "date_field" => "date",
        "image_field" => "cover"
      },
      "films" => {
        "path" => "/films-feed.xml",
        "title" => "Projection Room",
        "subtitle" => "Adaptation reviews as cinematic literary art — fidelity, craft, and book-to-screen critique.",
        "limit" => 100,
        "hidden_data_key" => "film_shelf_exclusions",
        "hidden_slug_key" => "hidden_slugs",
        "date_field" => "date_watched",
        "image_field" => "poster"
      },
      "verse" => {
        "path" => "/verse-feed.xml",
        "title" => "Verse",
        "subtitle" => "Uncut image — raw chorus sibling to curated literary analysis.",
        "limit" => 100,
        "hidden_data_key" => "verse_shelf_exclusions",
        "hidden_slug_key" => "hidden_slugs",
        "date_field" => "date_written",
        "image_field" => nil
      }
    }.freeze

    def generate(site)
      return if site.config.dig("feed", "disable_in_development") && Jekyll.env == "development"

      FEEDS.each do |collection_name, meta|
        docs = shelf_docs(site, collection_name, meta)
        next if docs.empty?

        site.pages << feed_page(site, collection_name, meta, docs)
        Jekyll.logger.info "Shelf Feeds:", "Generated #{meta['path']} (#{docs.length} entries)"
      end
    end

    private

    def shelf_docs(site, collection_name, meta)
      hidden = site.data.dig(meta["hidden_data_key"], meta["hidden_slug_key"]) || []
      docs = site.collections[collection_name]&.docs || []
      docs = docs.reject { |doc| doc.data["shelf"] == false }
      docs = docs.reject { |doc| hidden.include?(doc.data["slug"]) }
      docs.sort_by { |doc| sort_key(doc, meta["date_field"]) }.reverse.first(meta["limit"])
    end

    def sort_key(doc, date_field)
      date_val = doc.data[date_field] || doc.data["date"]
      timestamp = parse_time(date_val)&.to_i || 0
      sort_val = doc.data["sort_key"]
      sort_num = sort_val.is_a?(Numeric) ? sort_val.to_i : sort_val.to_s.to_i
      [timestamp, sort_num]
    end

    def parse_time(value)
      return nil if value.nil? || value.to_s.empty?

      case value
      when Time then value
      when Date then value.to_time
      else Time.parse(value.to_s)
      end
    rescue ArgumentError
      nil
    end

    def feed_page(site, collection_name, meta, docs)
      page = FeedPage.new(site, __dir__, "", meta["path"])
      page.content = render_feed(site, meta, docs)
      page.data.merge!(
        "layout" => nil,
        "sitemap" => false,
        "collection" => collection_name
      )
      page.output
      page
    end

    def render_feed(site, meta, docs)
      DarkHeartLabs::FeedRenderer.new(site, meta, docs).render
    end
  end

  class FeedRenderer
    def initialize(site, meta, docs)
      @site = site
      @config = site.config
      @meta = meta
      @docs = docs
      @xsl = File.exist?(site.in_source_dir("feed.xslt.xml"))
    end

    def render
      <<~XML
        <?xml version="1.0" encoding="utf-8"?>
        #{xsl_stylesheet if @xsl}
        <feed xmlns="http://www.w3.org/2005/Atom">
          <generator uri="https://darkheartlabs.technology/">Dark Heart Labs</generator>
          <link href="#{xml_attr feed_url}" rel="self" type="application/atom+xml" />
          <link href="#{xml_attr absolute_url('/')}" rel="alternate" type="text/html" />
          <updated>#{xml_date @site.time}</updated>
          <id>#{xml_attr feed_url}</id>
          <title type="html">#{xml_text feed_title}</title>
          <subtitle>#{xml_text @meta['subtitle']}</subtitle>
          #{author_xml}
          #{entries_xml}
        </feed>
      XML
    end

    private

    def xsl_stylesheet
      %(<?xml-stylesheet type="text/xsl" href="#{xml_attr absolute_url('/feed.xslt.xml')}"?>\n)
    end

    def feed_url
      absolute_url(@meta["path"])
    end

    def feed_title
      site_title = @config["title"] || @config["name"] || "Dark Heart Labs"
      "#{site_title} · #{@meta['title']}"
    end

    def author_xml
      author = @config["author"]
      name = author.is_a?(Hash) ? author["name"] : author
      email = author.is_a?(Hash) ? author["email"] : @config["email"]
      <<~XML.strip
        <author>
          <name>#{xml_text name}</name>
          #{email ? "<email>#{xml_text email}</email>" : ""}
        </author>
      XML
    end

    def entries_xml
      @docs.map { |doc| entry_xml(doc) }.join("\n")
    end

    def entry_xml(doc)
      title = doc.data["title"].to_s
      url = absolute_url(doc.url)
      published = doc.data[@meta["date_field"]] || doc.data["date"]
      summary = feed_summary(doc)
      content = rendered_content(doc)
      image = doc.data[@meta["image_field"]]

      <<~XML.strip
        <entry>
          <title type="html">#{xml_text title}</title>
          <link href="#{xml_attr url}" rel="alternate" type="text/html" title="#{xml_attr title}" />
          <published>#{xml_date published}</published>
          <updated>#{xml_date doc.data['date'] || published}</updated>
          <id>#{xml_attr url}</id>
          #{author_entry_xml(doc)}
          #{categories_xml(doc)}
          <summary type="html"><![CDATA[#{summary}]]></summary>
          <content type="html" xml:base="#{xml_attr url}"><![CDATA[#{content}]]></content>
          #{image_xml(image) if image}
        </entry>
      XML
    end

    def author_entry_xml(doc)
      name = doc.data["author"] || doc.data["director"] || site_author_name
      <<~XML.strip
        <author>
          <name>#{xml_text name}</name>
        </author>
      XML
    end

    def categories_xml(doc)
      tags = []
      tags << doc.data["category"] if doc.data["category"]
      tags.concat(Array(doc.data["tags"]))
      tags.compact.uniq.map { |tag| %(<category term="#{xml_attr tag}" />) }.join("\n")
    end

    def image_xml(image)
      src = image.start_with?("http") ? image : absolute_url(image)
      <<~XML.strip
        <media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="#{xml_attr src}" />
      XML
    end

    def feed_summary(doc)
      if doc.data["dek"] && !doc.data["dek"].empty?
        return CGI.escapeHTML(doc.data["dek"].to_s)
      end

      if doc.data["description"] && !doc.data["description"].empty?
        return CGI.escapeHTML(doc.data["description"].to_s)
      end

      text = strip_markdown(doc.content.to_s)
      text = text.sub(/\AHook & thesis\s*/i, "")
      text = text.split(/\*\*Verdict:\*\*/i).last.to_s.strip if text.include?("**Verdict:**")
      text = text.sub(/\AJV · Dark Heart Labs\s*$/i, "").strip
      CGI.escapeHTML(text[0, 280].strip)
    end

    def rendered_content(doc)
      converter = @site.find_converter_instance(Jekyll::Converters::Markdown)
      converter.convert(doc.content.to_s)
    end

    def strip_markdown(text)
      text
        .gsub(/^#+\s*/, "")
        .gsub(/\*\*(.*?)\*\*/, '\1')
        .gsub(/\*(.*?)\*/, '\1')
        .gsub(/\[(.*?)\]\(.*?\)/, '\1')
        .gsub(/\s+/, " ")
        .strip
    end

    def site_author_name
      author = @config["author"]
      author.is_a?(Hash) ? author["name"] : author.to_s
    end

    def absolute_url(path)
      url = @config["url"].to_s.chomp("/")
      baseurl = @config["baseurl"].to_s
      baseurl = "" if baseurl == "/"
      baseurl = baseurl.chomp("/")
      path = path.start_with?("/") ? path : "/#{path}"
      "#{url}#{baseurl}#{path}"
    end

    def xml_text(value)
      CGI.escapeHTML(value.to_s)
    end

    def xml_attr(value)
      CGI.escapeHTML(value.to_s).gsub("'", "&apos;")
    end

    def xml_date(value)
      return Time.now.iso8601 if value.nil? || value.to_s.empty?

      time =
        case value
        when Time then value
        when Date then value.to_time
        else Time.parse(value.to_s)
        end
      time.iso8601
    rescue ArgumentError
      Time.now.iso8601
    end
  end
end
