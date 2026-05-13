(function () {
  const STOP_WORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
    'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they', 'them', 'their',
  ]);

  const SUGGESTIONS = [
    'What did Abdul do at Walmart?',
    'Tell me about LexLLM',
    'What are his strongest skills?',
    'How can I contact him?',
  ];

  const KNOWLEDGE = [
    {
      id: 'overview',
      title: 'Overview',
      tags: ['abdul', 'sohail', 'ahmed', 'about', 'bio', 'summary', 'engineer', 'architect', 'portfolio', 'hire', 'available'],
      content: 'Abdul Sohail Ahmed is a Software Engineer and Data Architect based in the Bay Area. He builds scalable systems that process 10M+ daily transactions and AI pipelines over large knowledge bases. His work spans distributed microservices, data engineering, and LangChain RAG systems.',
    },
    {
      id: 'hero-stats',
      title: 'Highlights',
      tags: ['experience', 'years', 'transactions', 'gpa', 'stats', 'highlights', 'metrics'],
      content: 'Portfolio highlights include 4 years of experience, systems handling 10M+ daily transactions, and a 3.88 GPA at San Jose State University.',
    },
    {
      id: 'walmart',
      title: 'Walmart',
      tags: ['walmart', 'current', 'present', 'software engineer', 'spring boot', 'cassandra', 'microservices', 'rest', 'soa', 'j2ee', 'tracy'],
      content: 'At Walmart (Oct 2025 to Present) in Tracy, CA, Abdul works as a Software Engineer. He builds production REST APIs with J2EE and Spring Boot in a service-oriented architecture, supports distributed microservices handling 10M+ daily transactions, works with Apache Cassandra, contributes to CI/CD, and raises test coverage with JUnit and Mockito.',
    },
    {
      id: 'flix',
      title: 'Flix',
      tags: ['flix', 'data analyst', 'snowflake', 'databricks', 'pyspark', 'power bi', 'anaplan', 'fabric', 'adp', 'workday', 'hr', 'etl'],
      content: 'At Flix (Apr 2025 to Oct 2025) in San Jose, CA, Abdul was a Data Analyst. He built an end-to-end ETL pipeline from ADP and Workday into Snowflake and Microsoft Fabric, used PySpark in Azure Databricks, optimized 40+ SQL jobs, automated Power BI dashboards, and improved data quality by 21%.',
    },
    {
      id: 'stackgen',
      title: 'StackGen',
      tags: ['stackgen', 'intern', 'langchain', 'rag', 'llm', 'gpt', 'llama', 'mistral', 'gemma', 'docker', 'kubernetes', 'airflow', 'spark', 'dbt', 'mongodb', 'hadoop'],
      content: 'At StackGen (May 2024 to Nov 2024) in San Jose, CA, Abdul was a Data Engineer Intern. He built a LangChain RAG infrastructure manifest generator with Llama 3, Mistral 7B, Gemma, and GPT-4o, exposed REST APIs in Docker and Kubernetes, and maintained scalable ETL pipelines with Hadoop, Spark, DBT, MongoDB, and Airflow.',
    },
    {
      id: 'deloitte',
      title: 'Deloitte',
      tags: ['deloitte', 'data analyst', 'tableau', 'power bi', 'alteryx', 'looker', 'audit', 'fraud', 'sage', 'peoplesoft', 'hyderabad'],
      content: 'At Deloitte (Dec 2020 to Nov 2022) in Hyderabad, India, Abdul was a Data Analyst. He integrated Sage Intacct and PeopleSoft ERP data, delivered 80+ dashboards across Tableau, Power BI, Alteryx, and Looker, used Azure Databricks for large-scale financial analysis, and built fraud detection workflows with SQL, Python, SAS, and ACL Analytics.',
    },
    {
      id: 'happiest-minds',
      title: 'Happiest Minds',
      tags: ['happiest minds', 'intern', 'churn', 'cassandra', 'tableau', 'random forest', 'gradient boosting', 'rfm', 'telecom', 'bengaluru'],
      content: 'At Happiest Minds (May 2019 to Jun 2019) in Bengaluru, India, Abdul was a Data Scientist Intern. He analyzed telecom churn with Apache Cassandra, benchmarked models in Python, R, and MATLAB, applied RFM feature engineering, and built Tableau dashboards for retention KPIs.',
    },
    {
      id: 'lexllm',
      title: 'LexLLM',
      tags: ['lexllm', 'legal', 'ai', 'nlp', 'gpt', 'gemini', 'llama', 'mixtral', 'rag', 'langchain', 'project'],
      content: 'LexLLM is an AI legal assistant project. It uses GPT-4o, Gemini 1.5, Llama 3.1, and Mixtral 8x7b with RAG pipelines over a 52 GB knowledge base of 10,236 legal documents. Reported results include +14.3% text accuracy and -9.5% perplexity.',
    },
    {
      id: 'p2p',
      title: 'P2P Lending Risk Prediction',
      tags: ['p2p', 'lending', 'risk', 'xgboost', 'lightgbm', 'smote', 'finance', 'machine learning', 'project'],
      content: 'The P2P Lending Risk Prediction project uses a stacking ensemble of XGBoost and Random Forest with SMOTE for class imbalance. It achieved 99.23% accuracy and +10.25% risk precision with a LightGBM pipeline.',
    },
    {
      id: 'vtuber',
      title: 'VTuber Stream Analytics',
      tags: ['vtuber', 'analytics', 'azure', 'power bi', 'dotnet', 'oauth', 'stream', 'project'],
      content: 'VTuber Stream Analytics is a full-stack analytics platform with Azure data orchestration and Power BI dashboards. It includes a .NET website with Google OAuth SSO serving 1,000+ users and improved decision efficiency and engagement.',
    },
    {
      id: 'skills',
      title: 'Skills',
      tags: ['skills', 'stack', 'languages', 'backend', 'data engineering', 'databases', 'ai', 'ml', 'bi', 'proficiency', 'python', 'java', 'sql', 'snowflake', 'spark', 'langchain', 'kubernetes', 'docker'],
      content: 'Core skills include Java, Python, R, and SQL; Spring Boot, REST APIs, and microservices; Apache Spark, Airflow, DBT, Hadoop, Azure Synapse, and Databricks; Snowflake, PostgreSQL, MySQL, MongoDB, and Cassandra; LangChain, TensorFlow, PyTorch, Scikit-learn, Power BI, Tableau, and Looker. Top proficiency areas include Python/PySpark (95%), Java/Spring Boot (90%), SQL/Snowflake (92%), Data Engineering (93%), LangChain/RAG/LLMs (88%), Power BI/Tableau (87%), Azure/Databricks (85%), and Docker/Kubernetes (80%).',
    },
    {
      id: 'education',
      title: 'Education',
      tags: ['education', 'school', 'university', 'degree', 'gpa', 'sjsu', 'vit', 'master', 'bachelor'],
      content: 'Abdul earned an M.S. in Data Analytics from San Jose State University (Jan 2023 to Dec 2024) with a 3.88/4.0 GPA, and a B.Tech in Computer Science and Engineering from Vellore Institute of Technology (Jun 2017 to Jun 2021) with a 9.34/10.0 GPA.',
    },
    {
      id: 'contact',
      title: 'Contact',
      tags: ['contact', 'email', 'phone', 'linkedin', 'github', 'location', 'reach', 'message', 'hire', 'remote', 'hybrid', 'bay area'],
      content: 'Contact Abdul at abdulsohail018@gmail.com or (925) 674-3646. LinkedIn: linkedin.com/in/abdulsohailahmed. GitHub: github.com/abdulsohailahmed. He is based in Tracy, CA in the Bay Area, open to hybrid or remote full-time Software Engineering and Data Engineering roles, and typically replies within 24 hours.',
    },
  ];

  const GREETING_PATTERN = /^(hi|hello|hey|good (morning|afternoon|evening)|howdy|greetings)\b/;
  const THANKS_PATTERN = /^(thanks|thank you|thx|appreciate it)\b/;
  const CONTACT_PATTERN = /\b(email|phone|contact|linkedin|github|reach|message|call)\b/;
  const SKILLS_PATTERN = /\b(skill|stack|proficien|language|framework|tool|technology|technologies)\b/;
  const EDUCATION_PATTERN = /\b(education|school|university|degree|gpa|sjsu|vit|college)\b/;
  const PROJECT_PATTERN = /\b(project|lexllm|p2p|vtuber|portfolio work|built)\b/;
  const EXPERIENCE_PATTERN = /\b(experience|work|job|role|company|employer|intern|walmart|flix|stackgen|deloitte|happiest minds)\b/;

  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9+.#/ ]/g, ' ')
      .split(/\s+/)
      .filter((token) => token && !STOP_WORDS.has(token));
  }

  function scoreEntry(queryTokens, entry) {
    const haystack = `${entry.title} ${entry.tags.join(' ')} ${entry.content}`.toLowerCase();
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

  function buildAnswer(query) {
    const normalized = query.trim();

    if (!normalized) {
      return 'Ask me about Abdul\'s experience, projects, skills, education, or contact details.';
    }

    if (GREETING_PATTERN.test(normalized.toLowerCase())) {
      return 'Hi. I can answer questions about Abdul Sohail Ahmed\'s experience, projects, skills, education, and contact details from this portfolio.';
    }

    if (THANKS_PATTERN.test(normalized.toLowerCase())) {
      return 'You are welcome. If you want more detail, ask about a company, project, or skill area.';
    }

    const entries = pickEntries(normalized);
    if (!entries.length) {
      return 'I could not find that in the portfolio yet. Try asking about Walmart, StackGen, LexLLM, skills, education, or how to contact Abdul.';
    }

    const intro = entries.length === 1
      ? `Here is what the portfolio says about ${entries[0].title}:`
      : 'Here is what the portfolio highlights:';

    const body = entries.map((entry) => entry.content).join('\n\n');
    const lower = normalized.toLowerCase();

    if (CONTACT_PATTERN.test(lower) && !entries.some((entry) => entry.id === 'contact')) {
      return `${intro}\n\n${body}\n\n${KNOWLEDGE.find((entry) => entry.id === 'contact').content}`;
    }

    if (SKILLS_PATTERN.test(lower) && entries.every((entry) => entry.id !== 'skills')) {
      return `${intro}\n\n${body}\n\n${KNOWLEDGE.find((entry) => entry.id === 'skills').content}`;
    }

    if (EDUCATION_PATTERN.test(lower) && entries.every((entry) => entry.id !== 'education')) {
      return `${intro}\n\n${body}\n\n${KNOWLEDGE.find((entry) => entry.id === 'education').content}`;
    }

    if (EXPERIENCE_PATTERN.test(lower) && entries.length === 1 && entries[0].id === 'overview') {
      const experienceEntries = KNOWLEDGE.filter((entry) => ['walmart', 'flix', 'stackgen', 'deloitte', 'happiest-minds'].includes(entry.id));
      return `Here is Abdul's work history from the portfolio:\n\n${experienceEntries.map((entry) => entry.content).join('\n\n')}`;
    }

    if (PROJECT_PATTERN.test(lower) && entries.length === 1 && entries[0].id === 'overview') {
      const projectEntries = KNOWLEDGE.filter((entry) => ['lexllm', 'p2p', 'vtuber'].includes(entry.id));
      return `Here are Abdul's featured projects:\n\n${projectEntries.map((entry) => entry.content).join('\n\n')}`;
    }

    return `${intro}\n\n${body}`;
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
          <input id="portfolio-assistant-input" type="text" maxlength="280" autocomplete="off" placeholder="Ask about experience, projects, or skills" />
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

    function addMessage(text, role) {
      const node = document.createElement('div');
      node.className = `assistant-message ${role}`;
      node.textContent = text;
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
          addMessage('Ask about Abdul\'s work history, projects, skills, education, or how to reach him.', 'assistant');
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
