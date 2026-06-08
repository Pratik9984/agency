import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Easter Egg: If scanning our own agency website, return 100s and a funny quote!
  const isOwnAgency = /stackandscale\.in/i.test(targetUrl);
  if (isOwnAgency) {
    return NextResponse.json({
      perf: 100,
      access: 100,
      best: 100,
      seo: 100,
      metrics: {
        fcp: "0.1s",
        lcp: "0.2s",
        tbt: "0ms",
        cls: "0.00",
        si: "0.1s"
      },
      aiAnalysis: `### Speed & Performance\n- **Faster than Physics**: Our code compiles at 299,792 km/s. Lighthouse's timers couldn't register the page load because the assets arrived yesterday.\n\n### UI & UX Design\n- **Sublime Interactivity**: Interfaces so smooth they slide. The user drop-off rate is precisely 0.00% because nobody wants to leave.\n\n### Search Engine Optimization (SEO)\n- **Top of the Food Chain**: We don't rank on Google; Google ranks below us. Sitemaps are pre-compiled into search engine indexes.\n\n### Security & Trust\n- **Fort Knox Standards**: Protected by encryption so dense that hackers start doubting their life choices and ask us for job applications.\n\n*Disclaimer: Stack&Scale does not assume legal responsibility for any wind tunnel testing or hair loss caused by extreme browsing speeds. Core compilation occurs in the past.*`,
      isMocked: false
    });
  }

  const groqKey = process.env.GROQ_API_KEY;

  try {
    const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
    const params = new URLSearchParams({
      url: targetUrl,
      strategy: 'mobile',
    });
    categories.forEach(cat => params.append('category', cat));

    // Support optional Google PageSpeed key to increase API quota and prevent 429s
    const pagespeedKey = process.env.PAGESPEED_API_KEY || process.env.GOOGLE_API_KEY;
    if (pagespeedKey) {
      params.append('key', pagespeedKey);
    }

    const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;
    
    // Attempt actual Google PageSpeed Insights audit for strict, genuine data
    const response = await fetch(apiEndpoint, {
      next: { revalidate: 60 } // Cache audits for 60 seconds
    });

    if (response.ok) {
      const data = await response.json();
      
      const perfScore = data.lighthouseResult?.categories?.performance?.score !== undefined
        ? Math.round(data.lighthouseResult.categories.performance.score * 100)
        : 0;

      const accessScore = data.lighthouseResult?.categories?.accessibility?.score !== undefined
        ? Math.round(data.lighthouseResult.categories.accessibility.score * 100)
        : 0;

      const bestScore = data.lighthouseResult?.categories?.['best-practices']?.score !== undefined
        ? Math.round(data.lighthouseResult.categories['best-practices'].score * 100)
        : 0;

      const seoScore = data.lighthouseResult?.categories?.seo?.score !== undefined
        ? Math.round(data.lighthouseResult.categories.seo.score * 100)
        : 0;

      // Parse Core Web Vitals timings
      const audits = data.lighthouseResult?.audits || {};
      const metrics = {
        fcp: audits['first-contentful-paint']?.displayValue || '1.8s',
        lcp: audits['largest-contentful-paint']?.displayValue || '3.2s',
        tbt: audits['total-blocking-time']?.displayValue || '260ms',
        cls: audits['cumulative-layout-shift']?.displayValue || '0.08',
        si: audits['speed-index']?.displayValue || '2.9s'
      };

      let aiAnalysis = '';
      if (groqKey) {
        try {
          const groqEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
          const prompt = `Act as a Senior Web Architect and UX/SEO Evaluator. Below are the audited Lighthouse metrics for the website ${targetUrl}:
- Speed/Performance: ${perfScore}/100
- Accessibility (UI/UX): ${accessScore}/100
- Best Practices (Security/Trust): ${bestScore}/100
- SEO: ${seoScore}/100
- FCP: ${metrics.fcp}
- LCP: ${metrics.lcp}
- TBT: ${metrics.tbt}
- CLS: ${metrics.cls}
- Speed Index: ${metrics.si}

Generate exactly 4 concise, highly technical and actionable optimization recommendations, structured strictly under the following four headers:
1. "### Speed & Performance" (optimizing image assets, script deferring, caching pipelines)
2. "### UI & UX Design" (fixing Cumulative Layout Shift, resolving accessibility contrast, mobile usability)
3. "### Search Engine Optimization (SEO)" (handling sitemaps, semantic tags, robot indexing rules)
4. "### Security & Trust" (SSL setups, HTTP redirects, HSTS headers, secure dependency updates)

Under each header, write a brief explanation and specific bullet point actions. Return your recommendations in a clean, markdown format. Do not include introductory or concluding conversational text.`;

          const groqResponse = await fetch(groqEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${groqKey}`
            },
            body: JSON.stringify({
              model: 'llama-3.1-8b-instant',
              messages: [
                { role: 'user', content: prompt }
              ],
              temperature: 0.2
            })
          });

          if (groqResponse.ok) {
            const groqData = await groqResponse.json();
            aiAnalysis = groqData.choices?.[0]?.message?.content || '';
          }
        } catch (e) {
          console.error('Groq call in hybrid failed:', e);
        }
      }

      if (!aiAnalysis) {
        aiAnalysis = `### Real-Time Diagnostics Core Locked\n\nConfigure diagnostics credentials in your \`.env.local\` file to unlock live, code-driven diagnostics and optimization advice for **${targetUrl.replace(/^https?:\/\//, '')}**.`;
      }

      return NextResponse.json({
        perf: perfScore,
        access: accessScore,
        best: bestScore,
        seo: seoScore,
        metrics,
        aiAnalysis,
        isMocked: false
      });
    }

    // If Google API failed (rate limits 429 / offline 503), fall back to Groq-only or Mock
    const errText = await response.text();
    console.warn(`PageSpeed API returned status ${response.status}: ${errText.substring(0, 100)}. Invoking Groq fallback simulation...`);
    
    return await handleGroqFallback(targetUrl, groqKey, response.status);

  } catch (error: any) {
    console.error('Failed to run hybrid PageSpeed audit, using Groq fallback:', error);
    return await handleGroqFallback(targetUrl, groqKey, 500);
  }
}

async function handleGroqFallback(targetUrl: string, groqKey: string | undefined, errorCode: number) {
  const defaultMetrics = {
    fcp: '2.4s',
    lcp: '4.1s',
    tbt: '480ms',
    cls: '0.18',
    si: '3.9s'
  };

  if (!groqKey) {
    return NextResponse.json({
      perf: 52,
      access: 80,
      best: 74,
      seo: 85,
      metrics: defaultMetrics,
      aiAnalysis: `### Real-Time Diagnostics Core Locked\n\nDiagnostics core is currently rate-limited (Status ${errorCode}). Configure diagnostics credentials in your \`.env.local\` to enable active, simulated diagnostics advice.`,
      isMocked: true
    });
  }

  try {
    const groqEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
    
    const prompt = `You are a Senior Web Architect and UX/SEO Evaluator. Analyze the website ${targetUrl}. 
Estimate realistic, granular mobile scores for the following categories:
- Speed/Performance (estimated performance and asset compression)
- UI/UX Design (estimated layout stability, UX responsiveness, and accessibility)
- Security/Trust (estimated SSL/best-practices and secure headers configuration)
- SEO (estimated search crawler optimization)
And speed metrics (FCP, LCP, TBT, CLS, SI) based on the domain footprint.

Then, generate exactly 4 concise, highly technical and actionable optimization recommendations, one for each of the categories listed above.

Return your response as a JSON object with EXACTLY the following structure:
{
  "perf": 72, // Speed score (integer between 40 and 95)
  "access": 85, // UI/UX score (integer between 50 and 98)
  "best": 78, // Trust score (integer between 50 and 98)
  "seo": 82, // SEO score (integer between 50 and 100)
  "metrics": {
    "fcp": "1.8s", 
    "lcp": "2.9s", 
    "tbt": "280ms", 
    "cls": "0.12", 
    "si": "3.1s" 
  },
  "aiAnalysis": "### Speed & Performance\\n- Optimize assets...\\n\\n### UI & UX Design\\n- Stabilize layout shifts...\\n\\n### Search Engine Optimization (SEO)\\n- Incorporate schemas...\\n\\n### Security & Trust\\n- Configure HSTS headers..."
}`;

    const groqResponse = await fetch(groqEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });

    if (groqResponse.ok) {
      const groqData = await groqResponse.json();
      const content = groqData.choices?.[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        return NextResponse.json({
          perf: parsed.perf || 65,
          access: parsed.access || 82,
          best: parsed.best || 78,
          seo: parsed.seo || 88,
          metrics: parsed.metrics || defaultMetrics,
          aiAnalysis: `⚠️ **Diagnostics Service Gateway Rate-Limit (Status ${errorCode})**: Displaying simulated diagnostics and live neural network analysis for **${targetUrl.replace(/^https?:\/\//, '')}**.\n\n` + (parsed.aiAnalysis || ''),
          isMocked: true
        });
      }
    }
  } catch (groqErr) {
    console.error('Groq fallback call failed:', groqErr);
  }

  // Final fallback if both Google and Groq fail
  return NextResponse.json({
    perf: 52,
    access: 80,
    best: 74,
    seo: 85,
    metrics: defaultMetrics,
    aiAnalysis: `### Real-Time Diagnostics Offline\n\nDiagnostics services are temporarily unreachable. Please check your system configuration or try again shortly.`,
    isMocked: true
  });
}
