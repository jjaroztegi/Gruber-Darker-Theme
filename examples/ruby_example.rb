require "optparse"

options = { limit: 10 }

OptionParser.new do |parser|
  parser.banner = "Usage: report.rb [options]"

  parser.on("-l", "--limit N", Integer, "Row limit") do |value|
    options[:limit] = value
  end

  parser.on("-f", "--format NAME", "Output format") do |value|
    options[:format] = value
  end

  parser.on("-h", "--help", "Show help") do
    puts parser
    exit
  end
end.parse!

puts "Limit: #{options[:limit]}"
puts "Format: #{options.fetch(:format, 'table')}"
