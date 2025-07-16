#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class NeutronDocsMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'neutron-docs-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search',
            description: 'Search across the Neutron Documentation documentation to fetch relevant context for a given query',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'The search query to find relevant documentation',
                },
                section: {
                  type: 'string',
                  description: 'Optional: Limit search to a specific section (developers, operators, resources, concepts, defi)',
                  enum: ['developers', 'operators', 'resources', 'concepts', 'defi', 'all'],
                },
                max_results: {
                  type: 'number',
                  description: 'Maximum number of results to return (default: 10)',
                  default: 10,
                },
              },
              required: ['query'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === 'search') {
        return await this.handleSearch(args);
      }

      throw new Error(`Unknown tool: ${name}`);
    });
  }

  async handleSearch(args) {
    const { query, section = 'all', max_results = 10 } = args;
    
    try {
      const results = await this.searchDocumentation(query, section, max_results);
      
      return {
        content: [
          {
            type: 'text',
            text: this.formatSearchResults(results, query),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error searching documentation: ${error.message}`,
          },
        ],
      };
    }
  }

  async searchDocumentation(query, section, maxResults) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    const results = [];

    // Define search directories based on section
    const searchDirs = this.getSearchDirectories(section);

    for (const dir of searchDirs) {
      const dirPath = path.join(__dirname, dir);
      try {
        await this.searchInDirectory(dirPath, searchTerms, results, dir);
      } catch (error) {
        console.error(`Error searching in ${dir}: ${error.message}`);
      }
    }

    // Score and sort results
    const scoredResults = results.map(result => ({
      ...result,
      score: this.calculateRelevanceScore(result, searchTerms, query),
    }));

    scoredResults.sort((a, b) => b.score - a.score);
    
    return scoredResults.slice(0, maxResults);
  }

  getSearchDirectories(section) {
    const allDirs = [
      'developers',
      'operators', 
      'resources',
      'concepts',
      'defi',
      'quickstart',
      'snippets',
      'module-reference',
      'concepts-reference',
      'interchain-queries-reference',
    ];

    if (section === 'all') {
      return allDirs;
    }

    return allDirs.filter(dir => dir.includes(section));
  }

  async searchInDirectory(dirPath, searchTerms, results, section) {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          await this.searchInDirectory(fullPath, searchTerms, results, section);
        } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
          try {
            const content = await fs.readFile(fullPath, 'utf-8');
            const matches = this.findMatches(content, searchTerms, fullPath, section);
            results.push(...matches);
          } catch (error) {
            console.error(`Error reading file ${fullPath}: ${error.message}`);
          }
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  findMatches(content, searchTerms, filePath, section) {
    const lines = content.split('\n');
    const matches = [];
    const fileName = path.basename(filePath, path.extname(filePath));
    
    // Extract title from frontmatter or filename
    const title = this.extractTitle(content) || fileName;
    
    // Check if title matches
    const titleMatches = searchTerms.some(term => 
      title.toLowerCase().includes(term)
    );

    // Find line matches
    const lineMatches = [];
    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();
      const matchingTerms = searchTerms.filter(term => lowerLine.includes(term));
      
      if (matchingTerms.length > 0) {
        lineMatches.push({
          lineNumber: index + 1,
          content: line.trim(),
          matchingTerms,
        });
      }
    });

    if (titleMatches || lineMatches.length > 0) {
      matches.push({
        file: filePath,
        title,
        section,
        titleMatch: titleMatches,
        lineMatches: lineMatches.slice(0, 5), // Limit to first 5 line matches
        contentPreview: this.extractContentPreview(content, searchTerms),
      });
    }

    return matches;
  }

  extractTitle(content) {
    // Try to extract title from frontmatter
    const frontmatterMatch = content.match(/^---\s*\n(.*?)\n---/s);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?\s*$/m);
      if (titleMatch) {
        return titleMatch[1];
      }
    }
    
    // Try to extract from first heading
    const headingMatch = content.match(/^#+\s*(.+)$/m);
    if (headingMatch) {
      return headingMatch[1];
    }
    
    return null;
  }

  extractContentPreview(content, searchTerms) {
    const lines = content.split('\n');
    const relevantLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();
      
      if (searchTerms.some(term => lowerLine.includes(term))) {
        // Include context around the match
        const start = Math.max(0, i - 1);
        const end = Math.min(lines.length, i + 2);
        const context = lines.slice(start, end).join('\n');
        relevantLines.push(context);
        
        if (relevantLines.length >= 3) break;
      }
    }
    
    return relevantLines.join('\n\n---\n\n');
  }

  calculateRelevanceScore(result, searchTerms, originalQuery) {
    let score = 0;
    
    // Title match bonus
    if (result.titleMatch) {
      score += 10;
    }
    
    // Number of matching terms
    const uniqueMatchingTerms = new Set();
    result.lineMatches.forEach(match => {
      match.matchingTerms.forEach(term => uniqueMatchingTerms.add(term));
    });
    score += uniqueMatchingTerms.size * 2;
    
    // Number of line matches
    score += result.lineMatches.length;
    
    // Bonus for exact phrase matches
    if (result.contentPreview.toLowerCase().includes(originalQuery.toLowerCase())) {
      score += 5;
    }
    
    // Section preference (developers section gets slight boost)
    if (result.section === 'developers') {
      score += 1;
    }
    
    return score;
  }

  formatSearchResults(results, query) {
    if (results.length === 0) {
      return `No results found for "${query}". Try different keywords or search terms.`;
    }

    let output = `Found ${results.length} result(s) for "${query}":\n\n`;

    results.forEach((result, index) => {
      output += `## ${index + 1}. ${result.title}\n`;
      output += `**File:** ${result.file}\n`;
      output += `**Section:** ${result.section}\n`;
      output += `**Relevance Score:** ${result.score}\n\n`;
      
      if (result.lineMatches.length > 0) {
        output += `**Matching lines:**\n`;
        result.lineMatches.forEach(match => {
          output += `- Line ${match.lineNumber}: ${match.content}\n`;
        });
        output += '\n';
      }
      
      if (result.contentPreview) {
        output += `**Content Preview:**\n`;
        output += '```\n';
        output += result.contentPreview;
        output += '\n```\n\n';
      }
      
      output += '---\n\n';
    });

    return output;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Neutron Docs MCP Server running on stdio');
  }
}

const server = new NeutronDocsMCPServer();
server.run().catch(console.error); 