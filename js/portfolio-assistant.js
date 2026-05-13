(function () {
  const STOP_WORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
    'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they', 'them', 'their',
    'his', 'her', 'him', 'abdul', 'sohail', 'ahmed',
  ]);

  const SUGGESTIONS = [
    'Would Abdul be suitable for a data scientist role?',
    'Analyze his strongest skills',
    'Is he a better fit for data engineering or software development?',
    'How can I contact him?',
  ];

  const KNOWLEDGE = [
    {
      id: 'overview',
      title: 'Overview',
      tags: ['about', 'bio', 'summary', 'engineer', 'architect', 'portfolio', 'hire', 'available', 'background', 'profile'],
      summary: 'Abdul Sohail Ahmed is a Software Engineer and Data Architect in the Bay Area.',
      details: [
        'He builds scalable systems that process 10M+ daily transactions.',
        'He architects AI pipelines over large knowledge bases.',
        'His work spans distributed microservices, data engineering, and LangChain RAG systems.',
      ],
    },
    {
      id: 'hero-stats',
      title: 'Highlights',
      tags: ['experience', 'years', 'transactions', 'gpa', 'stats', 'highlights', 'metrics'],
      summary: 'Key portfolio metrics from the hero section.',
      details: [
        '4 years of professional experience.',
        'Systems handling 10M+ daily transactions.',
        '3.88 GPA at San Jose State University.',
      ],
    },
    {
      id: 'walmart',
      title: 'Walmart',
      tags: ['walmart', 'current', 'present', 'software engineer', 'spring boot', 'cassandra', 'microservices', 'rest', 'soa', 'j2ee', 'tracy'],
      summary: 'Software Engineer at Walmart, Oct 2025 to Present, Tracy, CA.',
      details: [
        'Builds production REST APIs with J2EE and Spring Boot in a service-oriented architecture.',
        'Supports distributed microservices handling 10M+ daily transactions.',
        'Works with Apache Cassandra, CI/CD, JUnit, and Mockito.',
      ],
    },
    {
      id: 'flix',
      title: 'Flix',
      tags: ['flix', 'data analyst', 'snowflake', 'databricks', 'pyspark', 'power bi', 'anaplan', 'fabric', 'adp', 'workday', 'hr', 'etl'],
      summary: 'Data Analyst at Flix, Apr 2025 to Oct 2025, San Jose, CA.',
      details: [
        'Built an end-to-end ETL pipeline from ADP and Workday into Snowflake and Microsoft Fabric.',
        'Used PySpark in Azure Databricks and automated Power BI dashboards.',
        'Optimized 40+ SQL jobs and improved data quality by 21%.',
      ],
    },
    {
      id: 'stackgen',
      title: 'StackGen',
      tags: ['stackgen', 'intern', 'langchain', 'rag', 'llm', 'gpt', 'llama', 'mistral', 'gemma', 'docker', 'kubernetes', 'airflow', 'spark', 'dbt', 'mongodb', 'hadoop'],
      summary: 'Data Engineer Intern at StackGen, May 2024 to Nov 2024, San Jose, CA.',
      details: [
        'Built a LangChain RAG infrastructure manifest generator with Llama 3, Mistral 7B, Gemma, and GPT-4o.',
        'Exposed REST APIs in Docker and Kubernetes.',
        'Maintained scalable ETL pipelines with Hadoop, Spark, DBT, MongoDB, and Airflow.',
      ],
    },
    {
      id: 'deloitte',
      title: 'Deloitte',
      tags: ['deloitte', 'data analyst', 'tableau', 'power bi', 'alteryx', 'looker', 'audit', 'fraud', 'sage', 'peoplesoft', 'hyderabad'],
      summary: 'Data Analyst at Deloitte, Dec 2020 to Nov 2022, Hyderabad, India.',
      details: [
        'Integrated Sage Intacct and PeopleSoft ERP data for cross-system reporting.',
        'Delivered 80+ dashboards across Tableau, Power BI, Alteryx, and Looker.',
        'Built fraud detection workflows with SQL, Python, SAS, and ACL Analytics.',
      ],
    },
    {
      id: 'happiest-minds',
      title: 'Happiest Minds',
      tags: ['happiest minds', 'intern', 'churn', 'cassandra', 'tableau', 'random forest', 'gradient boosting', 'rfm', 'telecom', 'bengaluru'],
      summary: 'Data Scientist Intern at Happiest Minds, May 2019 to Jun 2019, Bengaluru, India.',
      details: [
        'Analyzed telecom churn with Apache Cassandra and built models in Python, R, and MATLAB.',
        'Applied RFM feature engineering and built Tableau dashboards for retention KPIs.',
        'Selected an ensemble approach that reduced churn by 12% in the internship project.',
      ],
    },
    {
      id: 'lexllm',
      title: 'LexLLM',
      tags: ['lexllm', 'legal', 'ai', 'nlp', 'gpt', 'gemini', 'llama', 'mixtral', 'rag', 'langchain', 'project'],
      summary: 'LexLLM is an AI legal assistant project.',
      details: [
        'Uses GPT-4o, Gemini 1.5, Llama 3.1, and Mixtral 8x7b with RAG pipelines.',
        'Runs over a 52 GB knowledge base of 10,236 legal documents.',
        'Reported results include +14.3% text accuracy and -9.5% perplexity.',
      ],
    },
    {
      id: 'p2p',
      title: 'P2P Lending Risk Prediction',
      tags: ['p2p', 'lending', 'risk', 'xgboost', 'lightgbm', 'smote', 'finance', 'machine learning', 'project'],
      summary: 'Peer-to-peer lending default prediction project.',
      details: [
        'Uses a stacking ensemble of XGBoost and Random Forest with SMOTE for class imbalance.',
        'Achieved 99.23% accuracy and +10.25% risk precision with a LightGBM pipeline.',
      ],
    },
    {
      id: 'vtuber',
      title: 'VTuber Stream Analytics',
      tags: ['vtuber', 'analytics', 'azure', 'power bi', 'dotnet', 'oauth', 'stream', 'project'],
      summary: 'VTuber Stream Analytics full-stack analytics platform.',
      details: [
        'Uses Azure data orchestration and Power BI dashboards.',
        'Includes a .NET website with Google OAuth SSO serving 1,000+ users.',
        'Improved decision efficiency and engagement for content analytics.',
      ],
    },
    {
      id: 'skills',
      title: 'Skills',
      tags: ['skills', 'stack', 'languages', 'backend', 'data engineering', 'databases', 'ai', 'ml', 'bi', 'proficiency', 'python', 'java', 'sql', 'snowflake', 'spark', 'langchain', 'kubernetes', 'docker'],
      summary: 'Technical toolkit and proficiency levels from the portfolio.',
      details: [
        'Languages: Java, Python, R, and SQL.',
        'Backend and APIs: Spring Boot, J2EE, REST APIs, microservices, and SOA.',
        'Data engineering: Apache Spark, Airflow, DBT, Hadoop, Azure Synapse, and Databricks.',
        'Databases: Snowflake, PostgreSQL, MySQL, MongoDB, and Cassandra.',
        'AI/ML and BI: LangChain, TensorFlow, PyTorch, Scikit-learn, Power BI, Tableau, and Looker.',
        'Top proficiency areas: Python/PySpark 95%, Java/Spring Boot 90%, SQL/Snowflake 92%, Data Engineering 93%, LangChain/RAG/LLMs 88%, Power BI/Tableau 87%, Azure/Databricks 85%, Docker/Kubernetes 80%.',
      ],
    },
    {
      id: 'education',
      title: 'Education',
      tags: ['education', 'school', 'university', 'degree', 'gpa', 'sjsu', 'vit', 'college', 'master', 'bachelor'],
      summary: 'Academic background listed on the portfolio.',
      details: [
        'M.S. in Data Analytics from San Jose State University, Jan 2023 to Dec 2024, GPA 3.88/4.0.',
        'B.Tech in Computer Science and Engineering from VIT, Jun 2017 to Jun 2021, GPA 9.34/10.0.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      tags: ['contact', 'email', 'phone', 'linkedin', 'github', 'location', 'reach', 'message', 'hire', 'remote', 'hybrid', 'bay area'],
      summary: 'How to reach Abdul and his availability.',
      details: [
        'Email: abdulsohail018@gmail.com.',
        'Phone: (925) 674-3646.',
        'LinkedIn: linkedin.com/in/abdulsohailahmed.',
        'GitHub: github.com/abdulsohailahmed.',
        'Location: Tracy, CA in the Bay Area.',
        'Open to hybrid or remote full-time Software Engineering and Data Engineering roles.',
        'Typically replies within 24 hours.',
      ],
    },
  ];

  const ROLE_PROFILES = [
    {
      id: 'data-analyst',
      name: 'Data Analyst',
      aliases: ['data analyst', 'business analyst', 'analytics analyst', 'reporting analyst', 'bi analyst'],
      verdict: 'Strong fit',
      verdictClass: 'strong',
      score: 94,
      summary: 'Abdul has repeated data analyst experience and strong BI, SQL, and dashboard delivery across Flix and Deloitte.',
      reasons: [
        'Held Data Analyst titles at Flix and Deloitte.',
        'Built ETL, reporting, and stakeholder-facing dashboards in Power BI, Tableau, Alteryx, and Looker.',
        'Strong SQL, Snowflake, and data quality work with measurable business outcomes.',
      ],
      evidence: ['flix', 'deloitte', 'vtuber'],
      skills: ['SQL / Snowflake — 92%', 'Power BI / Tableau — 87%', 'Python / PySpark — 95%', 'Data Engineering (ETL) — 93%'],
      gaps: ['Current title is Software Engineer, so recent day-to-day work is more backend engineering than reporting.'],
    },
    {
      id: 'data-scientist',
      name: 'Data Scientist',
      aliases: ['data scientist', 'data science', 'machine learning scientist', 'applied scientist'],
      verdict: 'Good fit',
      verdictClass: 'good',
      score: 86,
      summary: 'Abdul has credible modeling, experimentation, and ML project work, with stronger recent depth in engineering and applied AI systems.',
      reasons: [
        'Data Scientist Intern experience at Happiest Minds with churn modeling and feature engineering.',
        'ML projects include P2P Lending Risk Prediction and LexLLM with model evaluation and experimentation.',
        'Portfolio shows Python, R, Scikit-learn, XGBoost, and ensemble modeling experience.',
      ],
      evidence: ['happiest-minds', 'p2p', 'lexllm'],
      skills: ['Python / PySpark — 95%', 'LangChain / RAG / LLMs — 88%', 'Data Engineering (ETL) — 93%', 'Power BI / Tableau — 87%'],
      gaps: ['Most recent roles emphasize software engineering and data engineering more than full-time production model ownership.'],
    },
    {
      id: 'software-developer',
      name: 'Software Developer',
      aliases: ['software developer', 'software engineer', 'software engineering', 'software development', 'application developer', 'developer role'],
      verdict: 'Strong fit',
      verdictClass: 'strong',
      score: 95,
      summary: 'Abdul is currently a Software Engineer at Walmart and has production backend, API, and microservices experience.',
      reasons: [
        'Current Software Engineer role at Walmart with Spring Boot, REST APIs, and microservices.',
        'Production engineering work on systems handling 10M+ daily transactions.',
        'Experience with CI/CD, testing, service boundaries, and distributed systems.',
      ],
      evidence: ['walmart', 'stackgen', 'vtuber'],
      skills: ['Java / Spring Boot — 90%', 'Python / PySpark — 95%', 'Docker / Kubernetes — 80%', 'SQL / Snowflake — 92%'],
      gaps: ['Frontend depth is present in projects but is not the main focus of his recent work.'],
    },
    {
      id: 'data-engineer',
      name: 'Data Engineer',
      aliases: ['data engineer', 'data engineering', 'etl engineer', 'pipeline engineer', 'analytics engineer'],
      verdict: 'Strong fit',
      verdictClass: 'strong',
      score: 96,
      summary: 'Abdul has end-to-end pipeline, orchestration, and cloud data platform experience across internships and analyst roles.',
      reasons: [
        'Built ETL pipelines with Spark, Airflow, DBT, Hadoop, Snowflake, and Databricks.',
        'StackGen internship focused on scalable data engineering and AI-enabled services.',
        'Flix role included pipeline automation, SQL optimization, and data quality improvements.',
      ],
      evidence: ['stackgen', 'flix', 'walmart'],
      skills: ['Data Engineering (ETL) — 93%', 'Python / PySpark — 95%', 'SQL / Snowflake — 92%', 'Azure / Databricks — 85%'],
      gaps: ['Some roles also include analytics delivery, so he is broader than a pipeline-only profile.'],
    },
    {
      id: 'backend-engineer',
      name: 'Backend Engineer',
      aliases: ['backend engineer', 'backend developer', 'api engineer', 'microservices engineer', 'server side engineer'],
      verdict: 'Strong fit',
      verdictClass: 'strong',
      score: 93,
      summary: 'Abdul has strong backend credentials through Walmart microservices work and API-heavy internships.',
      reasons: [
        'Builds production REST APIs and event-driven microservices at Walmart.',
        'Uses Spring Boot, J2EE, Cassandra, and service-oriented architecture patterns.',
        'Has shipped API-backed systems in Docker and Kubernetes at StackGen.',
      ],
      evidence: ['walmart', 'stackgen'],
      skills: ['Java / Spring Boot — 90%', 'Docker / Kubernetes — 80%', 'SQL / Snowflake — 92%', 'Python / PySpark — 95%'],
      gaps: ['Less emphasis on low-level infrastructure or platform engineering than pure backend platform teams.'],
    },
    {
      id: 'ml-engineer',
      name: 'ML Engineer',
      aliases: ['ml engineer', 'machine learning engineer', 'ai engineer', 'applied ai engineer', 'llm engineer'],
      verdict: 'Good fit',
      verdictClass: 'good',
      score: 88,
      summary: 'Abdul is a strong fit for applied ML and LLM systems, especially where models are integrated into production pipelines and services.',
      reasons: [
        'Built LangChain RAG systems with multiple LLM backends at StackGen and in LexLLM.',
        'Combines model work with APIs, Docker, Kubernetes, and data pipelines.',
        'Has project and internship evidence in evaluation, experimentation, and applied AI delivery.',
      ],
      evidence: ['stackgen', 'lexllm', 'p2p'],
      skills: ['LangChain / RAG / LLMs — 88%', 'Python / PySpark — 95%', 'Data Engineering (ETL) — 93%', 'Docker / Kubernetes — 80%'],
      gaps: ['Portfolio shows more breadth across data and software engineering than a narrow research-heavy ML scientist profile.'],
    },
    {
      id: 'full-stack-developer',
      name: 'Full-Stack Developer',
      aliases: ['full stack developer', 'full-stack developer', 'full stack engineer', 'fullstack developer'],
      verdict: 'Good fit',
      verdictClass: 'good',
      score: 82,
      summary: 'Abdul can cover full-stack delivery, but his strongest evidence is backend, data, and analytics rather than frontend-first product engineering.',
      reasons: [
        'VTuber Stream Analytics includes a .NET website with Google OAuth SSO for 1,000+ users.',
        'Has API, data, and dashboard layers across multiple projects.',
        'Can connect product surfaces to analytics and backend services.',
      ],
      evidence: ['vtuber', 'stackgen', 'walmart'],
      skills: ['Java / Spring Boot — 90%', 'Python / PySpark — 95%', 'Power BI / Tableau — 87%', 'Azure / Databricks — 85%'],
      gaps: ['The portfolio does not position him primarily as a frontend specialist.'],
    },
    {
      id: 'data-architect',
      name: 'Data Architect',
      aliases: ['data architect', 'solution architect', 'analytics architect', 'data platform architect'],
      verdict: 'Good fit',
      verdictClass: 'good',
      score: 90,
      summary: 'Abdul already presents as an engineer and data architect, with evidence across distributed systems, data platforms, and AI pipelines.',
      reasons: [
        'Portfolio headline positions him as a Software Engineer and Data Architect.',
        'Experience spans microservices architecture, data platforms, and AI knowledge pipelines.',
        'Has designed service boundaries, ETL systems, and scalable data workflows.',
      ],
      evidence: ['overview', 'walmart', 'stackgen', 'flix'],
      skills: ['Data Engineering (ETL) — 93%', 'Java / Spring Boot — 90%', 'LangChain / RAG / LLMs — 88%', 'Azure / Databricks — 85%'],
      gaps: ['He is still early in senior architecture tenure compared with dedicated enterprise architect roles.'],
    },
    {
      id: 'bi-developer',
      name: 'BI Developer',
      aliases: ['bi developer', 'business intelligence developer', 'power bi developer', 'tableau developer', 'looker developer'],
      verdict: 'Strong fit',
      verdictClass: 'strong',
      score: 91,
      summary: 'Abdul has extensive dashboard and BI delivery experience across multiple tools and business domains.',
      reasons: [
        'Delivered 80+ dashboards at Deloitte and automated Power BI reporting at Flix.',
        'Uses Power BI, Tableau, Looker, and Alteryx in production contexts.',
        'Connects BI outputs to cleaned ETL and warehouse layers.',
      ],
      evidence: ['deloitte', 'flix', 'vtuber'],
      skills: ['Power BI / Tableau — 87%', 'SQL / Snowflake — 92%', 'Python / PySpark — 95%', 'Data Engineering (ETL) — 93%'],
      gaps: ['Recent Walmart role is less BI-focused than his analyst and consulting experience.'],
    },
  ];

  const GREETING_PATTERN = /^(hi|hello|hey|good (morning|afternoon|evening)|howdy|greetings)\b/;
  const THANKS_PATTERN = /^(thanks|thank you|thx|appreciate it)\b/;
  const ROLE_FIT_PATTERN = /\b(suitab|good fit|fit for|right for|qualified|match for|consider for|hire for|good candidate|best role|best fit|apply as|role as|work as|would he|would she|is he|is she|should i hire|should we hire|can he|can she)\b/;
  const ROLE_COMPARE_PATTERN = /\b(which role|which is better|better fit|compare|between|versus|vs)\b/;
  const SKILL_ANALYSIS_PATTERN = /\b(analyz|analysis|assess|assessment|breakdown|evaluate|review|strongest|top skills|skill profile|skill set)\b/;
  const CONTACT_PATTERN = /\b(email|phone|contact|linkedin|github|reach|message|call)\b/;
  const EDUCATION_PATTERN = /\b(education|school|university|degree|gpa|sjsu|vit|college)\b/;
  const PROJECT_PATTERN = /\b(project|lexllm|p2p|vtuber|portfolio work|built)\b/;
  const EXPERIENCE_PATTERN = /\b(experience|work history|worked at|job history|career|company|employer|intern|walmart|flix|stackgen|deloitte|happiest minds)\b/;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function block(title, bodyHtml) {
    return `<section class="assistant-block"><h4 class="assistant-block-title">${escapeHtml(title)}</h4>${bodyHtml}</section>`;
  }

  function list(items) {
    return `<ul class="assistant-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function composeAnswer(sections) {
    return sections.join('');
  }

  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9+.#/ ]/g, ' ')
      .split(/\s+/)
      .filter((token) => token && !STOP_WORDS.has(token));
  }

  function getEntry(id) {
    return KNOWLEDGE.find((entry) => entry.id === id);
  }

  function scoreEntry(queryTokens, entry) {
    const haystack = `${entry.title} ${entry.tags.join(' ')} ${entry.summary} ${entry.details.join(' ')}`.toLowerCase();
    const entryTokens = tokenize(haystack);
    const entrySet = new Set(entryTokens);
    let score = 0;

    queryTokens.forEach((token) => {
      if (entry.tags.some((tag) => tag.includes(token) || token.includes(tag))) {
        score += 8;
      }
      if (entry.title.toLowerCase().includes(token)) {
        score += 6;
      }
      if (entrySet.has(token)) {
        score += 3;
      } else if (haystack.includes(token)) {
        score += 1.5;
      }
    });

    return score;
  }

  function pickEntries(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    const queryTokens = tokenize(normalized);
    if (!queryTokens.length) {
      return [];
    }

    const ranked = KNOWLEDGE
      .map((entry) => ({ entry, score: scoreEntry(queryTokens, entry) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (!ranked.length) {
      return [];
    }

    const topScore = ranked[0].score;
    return ranked
      .filter((item, index) => index === 0 || item.score >= topScore * 0.55)
      .slice(0, 3)
      .map((item) => item.entry);
  }

  function detectRoles(query) {
    const lower = query.toLowerCase();
    return ROLE_PROFILES.filter((role) => role.aliases.some((alias) => lower.includes(alias)));
  }

  function buildRoleFitAnswer(role) {
    const evidenceItems = role.evidence
      .map((id) => getEntry(id))
      .filter(Boolean)
      .map((entry) => `${entry.title}: ${entry.summary}`);

    return composeAnswer([
      block('Role fit', `<p class="assistant-lead">${escapeHtml(role.name)}</p><div class="assistant-verdict ${role.verdictClass}">${escapeHtml(role.verdict)}</div><p>${escapeHtml(role.summary)}</p>`),
      block('Why this matches', list(role.reasons)),
      block('Portfolio evidence', list(evidenceItems)),
      block('Relevant skills', list(role.skills)),
      block('Considerations', `<p class="assistant-note">${escapeHtml(role.gaps.join(' '))}</p>`),
      block('Source', '<p class="assistant-note">This assessment is based only on the experience, projects, skills, and education shown on this portfolio.</p>'),
    ]);
  }

  function buildRoleComparisonAnswer(roles) {
    const ranked = [...roles].sort((a, b) => b.score - a.score);
    const comparisonItems = ranked.map((role) => `${role.name}: ${role.verdict} (${role.score}/100) — ${role.summary}`);

    return composeAnswer([
      block('Role comparison', '<p class="assistant-lead">Based on the portfolio, these are the closest role matches for your question.</p>'),
      block('Ranking', list(comparisonItems)),
      block('Best overall match', `<p>${escapeHtml(ranked[0].name)} is the strongest match in this comparison because ${escapeHtml(ranked[0].reasons[0].toLowerCase())}</p>`),
      block('How to read this', '<p class="assistant-note">Scores reflect portfolio evidence only. They compare fit across roles shown on this site, not against external candidates.</p>'),
    ]);
  }

  function buildRoleOverviewAnswer() {
    const ranked = [...ROLE_PROFILES].sort((a, b) => b.score - a.score);
    const overviewItems = ranked.map((role) => `${role.name}: ${role.verdict} (${role.score}/100)`);

    return composeAnswer([
      block('Role fit overview', '<p class="assistant-lead">Here is how Abdul maps to common roles based on this portfolio.</p>'),
      block('Best matches', list(overviewItems)),
      block('Strongest areas', list([
        'Software development and backend engineering through current Walmart microservices work.',
        'Data engineering through StackGen, Flix, and cloud pipeline experience.',
        'Analytics and BI through Deloitte, Flix, and dashboard-heavy project work.',
        'Applied AI and ML systems through StackGen, LexLLM, and ML projects.',
      ])),
      block('Next step', '<p class="assistant-note">Ask about a specific role, for example: "Would Abdul be suitable for a data scientist role?"</p>'),
    ]);
  }

  function buildSkillAnalysisAnswer() {
    const skillsEntry = getEntry('skills');

    return composeAnswer([
      block('Skill analysis', '<p class="assistant-lead">Abdul\'s strongest portfolio signals cluster around data platforms, backend engineering, and applied AI.</p>'),
      block('Top strengths', list([
        'Python / PySpark — 95%',
        'Data Engineering (ETL) — 93%',
        'SQL / Snowflake — 92%',
        'Java / Spring Boot — 90%',
        'LangChain / RAG / LLMs — 88%',
      ])),
      block('Where those skills show up', list(skillsEntry.details.slice(0, 4))),
      block('Role implications', list([
        'Strongest hiring signals: Data Engineer, Software Developer, Backend Engineer, Data Analyst, BI Developer.',
        'Good hiring signals: Data Scientist, ML Engineer, Data Architect, Full-Stack Developer.',
        'He is most differentiated where engineering, data platforms, and AI systems overlap.',
      ])),
      block('Source', '<p class="assistant-note">Proficiency bars and skill categories come directly from the Skills section of this portfolio.</p>'),
    ]);
  }

  function buildKnowledgeAnswer(entries, title) {
    const sections = entries.map((entry) => block(entry.title, `<p>${escapeHtml(entry.summary)}</p>${list(entry.details)}`));
    return composeAnswer([block(title, '<p class="assistant-lead">Here is what this portfolio shows.</p>'), ...sections]);
  }

  function buildExperienceAnswer() {
    const experienceEntries = KNOWLEDGE.filter((entry) => ['walmart', 'flix', 'stackgen', 'deloitte', 'happiest-minds'].includes(entry.id));
    return buildKnowledgeAnswer(experienceEntries, 'Experience');
  }

  function buildProjectAnswer() {
    const projectEntries = KNOWLEDGE.filter((entry) => ['lexllm', 'p2p', 'vtuber'].includes(entry.id));
    return buildKnowledgeAnswer(projectEntries, 'Projects');
  }

  function buildAnswer(query) {
    const normalized = query.trim();
    const lower = normalized.toLowerCase();

    if (!normalized) {
      return composeAnswer([
        block('How to use this assistant', '<p>Ask about Abdul\'s experience, projects, skills, education, contact details, or whether he is a fit for a specific role.</p>'),
      ]);
    }

    if (GREETING_PATTERN.test(lower)) {
      return composeAnswer([
        block('Welcome', '<p>Hi. I can answer questions about Abdul Sohail Ahmed using only the information on this portfolio.</p>'),
        block('You can ask about', list([
          'Work history at Walmart, Flix, StackGen, Deloitte, and Happiest Minds.',
          'Projects such as LexLLM, P2P Lending Risk Prediction, and VTuber Stream Analytics.',
          'Skill strengths and role fit for data, software, and AI positions.',
          'Education, contact details, and availability.',
        ])),
      ]);
    }

    if (THANKS_PATTERN.test(lower)) {
      return composeAnswer([
        block('You are welcome', '<p>Ask for a role-fit analysis or a deeper breakdown of skills if you need more detail.</p>'),
      ]);
    }

    const matchedRoles = detectRoles(lower);

    if (ROLE_COMPARE_PATTERN.test(lower) && matchedRoles.length > 1) {
      return buildRoleComparisonAnswer(matchedRoles);
    }

    if ((ROLE_FIT_PATTERN.test(lower) || matchedRoles.length) && matchedRoles.length === 1) {
      return buildRoleFitAnswer(matchedRoles[0]);
    }

    if (matchedRoles.length > 1 && ROLE_FIT_PATTERN.test(lower)) {
      return buildRoleComparisonAnswer(matchedRoles);
    }

    if (/\b(role fit|roles|which jobs|what roles|what positions|what kind of role)\b/.test(lower)) {
      return buildRoleOverviewAnswer();
    }

    if (SKILL_ANALYSIS_PATTERN.test(lower) && /\b(skill|skills|stack|profile)\b/.test(lower)) {
      return buildSkillAnalysisAnswer();
    }

    if (CONTACT_PATTERN.test(lower)) {
      return buildKnowledgeAnswer([getEntry('contact')], 'Contact');
    }

    if (EDUCATION_PATTERN.test(lower)) {
      return buildKnowledgeAnswer([getEntry('education')], 'Education');
    }

    if (EXPERIENCE_PATTERN.test(lower)) {
      return buildExperienceAnswer();
    }

    if (PROJECT_PATTERN.test(lower)) {
      return buildProjectAnswer();
    }

    const entries = pickEntries(normalized);
    if (!entries.length) {
      return composeAnswer([
        block('No direct match', '<p>I could not find that in the portfolio yet.</p>'),
        block('Try asking', list([
          'Would Abdul be suitable for a data analyst role?',
          'Analyze his strongest skills.',
          'Tell me about LexLLM.',
          'How can I contact him?',
        ])),
      ]);
    }

    if (entries.length === 1) {
      return buildKnowledgeAnswer(entries, entries[0].title);
    }

    return buildKnowledgeAnswer(entries, 'Portfolio highlights');
  }

  function createMarkup() {
    const root = document.createElement('div');
    root.id = 'portfolio-assistant-root';
    root.innerHTML = `
      <div id="portfolio-assistant-panel" role="dialog" aria-label="Portfolio assistant" aria-hidden="true">
        <div class="assistant-header">
          <div class="assistant-header-copy">
            <div class="assistant-kicker">Portfolio guide</div>
            <div class="assistant-title">Ask about Abdul</div>
            <div class="assistant-subtitle">Answers come from this site only.</div>
          </div>
          <button type="button" class="assistant-close" aria-label="Close assistant">×</button>
        </div>
        <div class="assistant-messages" aria-live="polite"></div>
        <div class="assistant-suggestions"></div>
        <form class="assistant-form">
          <input id="portfolio-assistant-input" type="text" maxlength="320" autocomplete="off" placeholder="Ask about roles, skills, experience, or projects" />
          <button id="portfolio-assistant-send" type="submit" aria-label="Send message">→</button>
        </form>
      </div>
      <button id="portfolio-assistant-launcher" type="button" aria-label="Open portfolio assistant" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.1A9 9 0 1 0 12 3Zm0 2a7 7 0 0 1 5.6 11.2l.3.4-.2 2.3-2.2-.5-.4.2A7 7 0 0 1 5 12a7 7 0 0 1 7-7Zm-3.2 4.4c.1-.8.5-1.3 1.3-1.3.6 0 1.1.4 1.4 1.2.2.6.4 1.2.5 1.7.1.5-.1.9-.5 1.1-.3.2-.7.2-1.1 0-.5-.3-1-.8-1.4-1.2-.4-.4-.8-.7-1.2-.7-.4 0-.7.3-.7.8 0 .3.1.7.3 1.1.2.4.5.8.8 1.2.6.7 1.3 1.4 2.1 2 .8.6 1.7 1 2.6 1 .9 0 1.5-.4 1.9-1.1.4-.7.6-1.6.6-2.5 0-2.1-.6-3.8-1.7-5.1-1.1-1.3-2.6-2-4.4-2-1.5 0-2.7.5-3.6 1.4-.9.9-1.4 2.1-1.4 3.5 0 .5.1 1 .2 1.4h2.2c-.1-.3-.2-.7-.2-1 0-.6.2-1 .6-1.3Z"/></svg>
      </button>
    `;

    return root;
  }

  function mountAssistant() {
    const root = createMarkup();
    document.body.appendChild(root);

    const launcher = root.querySelector('#portfolio-assistant-launcher');
    const panel = root.querySelector('#portfolio-assistant-panel');
    const closeButton = root.querySelector('.assistant-close');
    const messages = root.querySelector('.assistant-messages');
    const suggestions = root.querySelector('.assistant-suggestions');
    const form = root.querySelector('.assistant-form');
    const input = root.querySelector('#portfolio-assistant-input');
    const sendButton = root.querySelector('#portfolio-assistant-send');
    let typingNode = null;
    let hasWelcomed = false;

    function addMessage(content, role) {
      const node = document.createElement('div');
      node.className = `assistant-message ${role}`;
      if (role === 'assistant') {
        node.innerHTML = content;
      } else {
        node.textContent = content;
      }
      messages.appendChild(node);
      messages.scrollTop = messages.scrollHeight;
      return node;
    }

    function setOpen(isOpen) {
      root.classList.toggle('is-open', isOpen);
      panel.setAttribute('aria-hidden', String(!isOpen));
      launcher.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        if (!hasWelcomed) {
          addMessage(
            composeAnswer([
              block('Welcome', '<p>I can answer questions about Abdul\'s background and assess role fit using only this portfolio.</p>'),
              block('Try asking', list([
                'Would he be suitable for a data analyst role?',
                'Analyze his strongest skills.',
                'Compare data engineering vs software development.',
              ])),
            ]),
            'assistant'
          );
          hasWelcomed = true;
        }
        window.setTimeout(() => input.focus(), 120);
      }
    }

    function renderSuggestions() {
      suggestions.innerHTML = '';
      SUGGESTIONS.forEach((prompt) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'assistant-suggestion';
        button.textContent = prompt;
        button.addEventListener('click', () => {
          input.value = prompt;
          submitQuery(prompt);
        });
        suggestions.appendChild(button);
      });
    }

    function showTyping() {
      typingNode = document.createElement('div');
      typingNode.className = 'assistant-message assistant typing';
      typingNode.innerHTML = '<span></span><span></span><span></span>';
      messages.appendChild(typingNode);
      messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
      if (typingNode) {
        typingNode.remove();
        typingNode = null;
      }
    }

    function submitQuery(rawQuery) {
      const query = rawQuery.trim();
      if (!query) {
        return;
      }

      addMessage(query, 'user');
      input.value = '';
      sendButton.disabled = true;
      showTyping();

      window.setTimeout(() => {
        hideTyping();
        addMessage(buildAnswer(query), 'assistant');
        sendButton.disabled = false;
        input.focus();
      }, 420);
    }

    launcher.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
    closeButton.addEventListener('click', () => setOpen(false));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitQuery(input.value);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && root.classList.contains('is-open')) {
        setOpen(false);
      }
    });

    launcher.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    launcher.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    closeButton.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    closeButton.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    sendButton.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    sendButton.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    suggestions.addEventListener('mouseover', (event) => {
      if (event.target.closest('.assistant-suggestion')) {
        document.body.classList.add('hovered');
      }
    });
    suggestions.addEventListener('mouseout', (event) => {
      if (event.target.closest('.assistant-suggestion')) {
        document.body.classList.remove('hovered');
      }
    });

    renderSuggestions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAssistant);
  } else {
    mountAssistant();
  }
})();
