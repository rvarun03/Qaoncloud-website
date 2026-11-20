export type JobSection = {
  title: string;
  description?: string;
  items?: string[];
};

export type Job = {
  id: string;
  slug: string;
  title: string;
  experience?: string;
  workMode: string;
  location?: string;
  summary?: string;
  sections: JobSection[];
};

export const jobs: Job[] = [
  {
    id: 'qa-automation-test-engineer',
    slug: 'qa-automation-test-engineer',
    title: 'QA – Automation Test Engineer',
    experience: '3–5 Years',
    workMode: 'Hybrid',
    summary: 'We are looking for a skilled Automation Test Engineer with 3–5 years of experience in test automation using modern frameworks like Playwright and Selenium. The ideal candidate should have hands-on experience building scalable automation frameworks and exposure to AI-driven testing tools and practices.',
    sections: [
      {
        title: 'Key Responsibilities',
        items: [
          'Design, develop, and maintain automated test scripts using Playwright and Selenium',
          'Build and enhance automation frameworks for web applications',
          'Collaborate with developers, product managers, and QA teams to understand requirements and define test strategies',
          'Execute automated test suites and analyze results to identify defects',
          'Integrate automation scripts into CI/CD pipelines',
          'Ensure high test coverage and improve overall product quality',
          'Participate in Agile/Scrum ceremonies and contribute to sprint deliverables',
        ],
      },
      {
        title: 'Required Skills & Qualifications',
        items: [
          '3–5 years of experience in test automation',
          'Strong hands-on experience with Playwright and Selenium',
          'Proficiency in programming languages such as JavaScript/TypeScript, Java, or Python',
          'Experience with API testing and tools like Postman/RestAssured',
          'Familiarity with version control tools (Git)',
          'Experience with CI/CD tools like Jenkins, GitHub Actions, or similar',
          'Strong understanding of software testing concepts, SDLC, and STLC',
        ],
      },
      {
        title: 'Preferred Skills',
        items: [
          'Experience with AI-driven testing tools (e.g., test case generation, self-healing scripts, intelligent test optimization)',
          'Exposure to tools like Testim, Mabl, or similar AI-based testing platforms',
          'Knowledge of performance testing is a plus',
          'Experience in cloud-based testing platforms (BrowserStack, Sauce Labs, etc.)',
        ],
      },
      {
        title: 'Soft Skills',
        items: [
          'Strong analytical and problem-solving skills',
          'Good communication and collaboration abilities',
          'Ability to work independently and in a team-oriented environment',
        ],
      },
    ],
  },
  {
    id: 'associate-delivery-manager-software-testing',
    slug: 'associate-delivery-manager-software-testing',
    title: 'Associate Delivery Manager – Software Testing',
    experience: '7–9 Years',
    workMode: 'Hybrid',
    summary: 'We are looking for an Associate Delivery Manager with strong experience in manual and automation testing, client management, and QA team leadership. The candidate will manage 3–4 projects concurrently, lead 10–15 QA resources, and ensure quality delivery for US and domestic clients.',
    sections: [
      {
        title: 'Key Responsibilities',
        items: [
          'Manage end-to-end QA delivery across multiple projects, ensuring quality and timely execution.',
          'Lead, mentor, and manage a team of 10–15 QA resources.',
          'Manage US and domestic client communications, project reviews, status reporting, and escalations.',
          'Plan resources, track project progress, manage risks, and monitor delivery metrics.',
          'Oversee test planning, test case design, execution, defect management, and automation coverage.',
          'Drive the adoption of AI tools such as Claude and ChatGPT to improve testing productivity.',
          'Identify process improvements and ensure high customer satisfaction.',
        ],
      },
      {
        title: 'Required Skills & Technical Expertise',
        items: [
          '7–9 years of experience in manual and automation testing.',
          'Mandatory ISTQB Foundation Level certification.',
          'Automation: Hands-on experience with Playwright (mandatory); Selenium or Cypress (optional).',
          'API Testing: Experience with Postman or REST Assured.',
          'Performance Testing: Basic knowledge of JMeter or similar tools.',
          'Test Management: Experience with Jira, TestRail, Zephyr, or similar tools.',
          'Programming: Working knowledge of Java, JavaScript, TypeScript, or Python.',
          'AI Tools: Practical exposure to Claude, ChatGPT, or other AI-powered tools for test case generation, script creation, and test analysis.',
          'Strong understanding of SDLC, STLC, Agile/Scrum, defect lifecycle, and QA metrics.',
          'Excellent communication, client management, team leadership, and problem-solving skills.',
        ],
      },
    ],
  },
  {
    id: 'qa-interns',
    slug: 'qa-interns',
    title: 'QA Interns',
    experience: '0-1 Year',
    workMode: 'Hybrid',
    sections: [
      {
        title: 'Skills Required',
        items: [
          'Degree in Computer Science, Engineering, or a related field.',
          'Completion of a software testing course is a plus.',
          'Basic knowledge of manual and automated testing (added advantage).',
          'Strong programming skills.',
          'Strong communication and collaboration skills.',
          'Ability to learn and adapt quickly in a dynamic environment.',
        ],
      },
    ],
  },
];
