import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Clock,
  User,
  ArrowRight,
  Search,
  TrendingUp,
  Lightbulb,
  Zap,
  Sparkles,
} from "lucide-react";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "5 Ways AI Content Automation Can Transform Your Business",
      excerpt: "Discover how artificial intelligence is revolutionizing content creation and helping businesses save time while maintaining quality and consistency.",
      category: "AI & Automation",
      readTime: "5 min read",
      date: "January 15, 2025",
      author: "Jason & Dominik",
      icon: Zap,
      featured: true,
    },
    {
      id: 2,
      title: "The Ultimate Guide to Content Marketing for Small Businesses",
      excerpt: "Learn proven strategies for creating and distributing valuable content that attracts and retains your target audience.",
      category: "Marketing Strategy",
      readTime: "8 min read",
      date: "January 10, 2025",
      author: "Smart Content Team",
      icon: TrendingUp,
      featured: true,
    },
    {
      id: 3,
      title: "How to Maintain Brand Voice with AI-Generated Content",
      excerpt: "Best practices for training AI systems to understand and replicate your unique brand voice across all content channels.",
      category: "Best Practices",
      readTime: "6 min read",
      date: "January 5, 2025",
      author: "Jason & Dominik",
      icon: Lightbulb,
      featured: false,
    },
    {
      id: 4,
      title: "SEO Optimization: Making Your Automated Content Rank",
      excerpt: "Essential SEO techniques to ensure your AI-generated content performs well in search engine results.",
      category: "SEO",
      readTime: "7 min read",
      date: "December 28, 2024",
      author: "Smart Content Team",
      icon: FileText,
      featured: false,
    },
  ];

  const categories = ["All", "AI & Automation", "Marketing Strategy", "Best Practices", "SEO"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Insights & Resources
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Content Automation
            <br />
            <span className="gradient-text">Insights & Resources</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Expert insights, tips, and guides to help you master content automation
            and grow your business with AI
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600">
              Must-read content to accelerate your automation journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredArticles
              .filter((article) => article.featured)
              .map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-green-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <article.icon className="w-20 h-20 text-white/20" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest in content automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles
              .filter((article) => !article.featured)
              .map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <article.icon className="w-12 h-12 text-blue-600/20" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No articles found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Subscribe to receive the latest insights, tips, and updates on content automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              className="h-12 bg-white"
            />
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            Join 1,000+ businesses already learning from our insights
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Automate Your Content?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Put these insights into action with our content automation solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Packages")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg px-8 py-6"
              >
                View Packages
              </Button>
            </Link>
            <Link to={createPageUrl("Contact")}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}