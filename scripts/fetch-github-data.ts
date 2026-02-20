#!/usr/bin/env tsx
/**
 * Script para obtener datos de GitHub para cada ebook
 * Se ejecuta antes del build para enriquecer los datos
 * 
 * Uso: npx tsx scripts/fetch-github-data.ts
 * 
 * Nota: Sin token, GitHub API permite 60 requests/hora
 * Con token, permite 5000 requests/hora
 */

import * as fs from 'fs';
import * as path from 'path';

interface Ebook {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  pagesUrl: string | null;
  hasPages: boolean;
  language: string | null;
  year: number;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
  category?: string;
  level?: string;
}

interface EbooksData {
  ebooks: Ebook[];
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  language: string | null;
  description: string | null;
}

const GITHUB_API = 'https://api.github.com';
const USER = 'statick88';

// Rate limiting: wait between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Extract repo name from URL
function getRepoName(url: string): string | null {
  const match = url.match(/github\.com\/[^/]+\/([^/]+)/);
  return match ? match[1] : null;
}

// Fetch repo data from GitHub API
async function fetchRepoData(repoName: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${USER}/${repoName}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Ebooks-Portfolio-Script',
      },
    });

    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch ${repoName}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Error fetching ${repoName}:`, error);
    return null;
  }
}

// Determine category based on tags
function determineCategory(tags: string[], title: string): string {
  const lowerTags = tags.map(t => t.toLowerCase());
  const lowerTitle = title.toLowerCase();

  if (lowerTags.includes('devops') || lowerTags.includes('docker') || lowerTags.includes('linux')) {
    return 'DevOps';
  }
  if (lowerTags.includes('react') || lowerTags.includes('javascript') || lowerTags.includes('html') || lowerTags.includes('css') || lowerTags.includes('frontend')) {
    return 'Frontend';
  }
  if (lowerTags.includes('django') || lowerTags.includes('fastapi') || lowerTags.includes('python') || lowerTags.includes('backend')) {
    return 'Backend';
  }
  if (lowerTags.includes('flutter') || lowerTags.includes('dart') || lowerTags.includes('mobile')) {
    return 'Mobile';
  }
  if (lowerTags.includes('data science') || lowerTags.includes('machine learning') || lowerTags.includes('pandas')) {
    return 'Data';
  }
  return 'Other';
}

// Determine level based on title/tags
function determineLevel(title: string, tags: string[]): string {
  const lowerTitle = title.toLowerCase();
  const lowerTags = tags.map(t => t.toLowerCase());

  if (lowerTitle.includes('avanzado') || lowerTitle.includes('advanced') || lowerTags.includes('avanzado')) {
    return 'Avanzado';
  }
  if (lowerTitle.includes('básico') || lowerTitle.includes('basic') || lowerTitle.includes('desde cero') || lowerTags.includes('básico')) {
    return 'Básico';
  }
  return 'Intermedio';
}

async function main() {
  console.log('🚀 Starting GitHub data fetch...\n');

  // Read existing data
  const dataPath = path.join(process.cwd(), 'src', 'data', 'ebooks.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data: EbooksData = JSON.parse(rawData);

  const updatedEbooks: Ebook[] = [];
  let requestCount = 0;

  for (const ebook of data.ebooks) {
    const repoName = getRepoName(ebook.githubUrl);
    
    if (!repoName) {
      console.log(`⏭️  Skipping ${ebook.id} - Invalid URL`);
      updatedEbooks.push(ebook);
      continue;
    }

    console.log(`📦 Fetching: ${repoName}`);
    
    // Rate limiting: wait 1 second between requests
    if (requestCount > 0) {
      await delay(1000);
    }
    requestCount++;

    const repoData = await fetchRepoData(repoName);

    if (repoData) {
      const updatedEbook: Ebook = {
        ...ebook,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        lastUpdated: repoData.pushed_at.split('T')[0], // YYYY-MM-DD
        category: ebook.category || determineCategory(ebook.tags, ebook.title),
        level: ebook.level || determineLevel(ebook.title, ebook.tags),
      };

      // Update language if null in original
      if (!ebook.language && repoData.language) {
        updatedEbook.language = repoData.language;
      }

      console.log(`   ⭐ ${updatedEbook.stars} stars | 🍴 ${updatedEbook.forks} forks | 📅 ${updatedEbook.lastUpdated}`);
      updatedEbooks.push(updatedEbook);
    } else {
      // Keep original data if fetch fails
      updatedEbooks.push({
        ...ebook,
        category: ebook.category || determineCategory(ebook.tags, ebook.title),
        level: ebook.level || determineLevel(ebook.title, ebook.tags),
      });
    }
  }

  // Write updated data
  const updatedData: EbooksData = { ebooks: updatedEbooks };
  fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));

  console.log('\n✅ GitHub data fetch complete!');
  console.log(`📊 Updated ${updatedEbooks.length} ebooks`);
  console.log(`🔢 API requests made: ${requestCount}`);
}

main().catch(console.error);
