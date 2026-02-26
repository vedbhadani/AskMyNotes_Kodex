/**
 * Mock API utilities — replace with real API calls when backend is ready.
 * These simulate realistic response shapes matching the backend contract.
 */

const NOT_FOUND_TRIGGERS = [
    'quantum', 'relativity', 'blockchain', 'cryptocurrency', 'nft', 'football',
    'weather', 'recipe', 'movie', 'sport', 'stock market',
];

/**
 * Generate a mock answer for the chat interface.
 * Returns the exact shape that the real API should return.
 *
 * Real API endpoint: POST /api/chat
 * Body: { subjectId, question }
 * Expected response: { answer, confidence, evidence[], citations[], notFound }
 */
export function generateMockAnswer(question, subject) {
    const q = question.toLowerCase();
    const subjectName = subject?.name || 'Unknown Subject';
    const files = subject?.files || [];

    // Trigger "not found" for off-topic questions
    const isOffTopic = NOT_FOUND_TRIGGERS.some(t => q.includes(t));
    if (isOffTopic || files.length === 0 && Math.random() < 0.25) {
        return {
            notFound: true,
            subjectName,
        };
    }

    const fileName1 = files[0]?.name || 'notes.pdf';
    const fileName2 = files[1]?.name || fileName1;

    const MOCK_RESPONSES = [
        {
            answer: `Based on your ${subjectName} notes, this concept involves several interconnected principles. The core idea emphasizes a systematic approach where each component builds upon the previous one, creating a cohesive framework for understanding the subject matter.`,
            confidence: 'High',
            evidence: [
                `"The primary mechanism involves a cascading series of events that are triggered by..." — from ${fileName1}, Section 3`,
                `"Key relationships between these components define the overall behavior of..." — from ${fileName2}, p.12`,
            ],
            citations: [`${fileName1} § Section 3`, `${fileName2} p.12`],
        },
        {
            answer: `Your ${subjectName} notes discuss this topic in the context of foundational theory. The material indicates that understanding this requires grasping the prerequisite concepts first, after which the application becomes more straightforward.`,
            confidence: 'Medium',
            evidence: [
                `"This phenomenon is best understood through the lens of..." — from ${fileName1}, Chapter 2`,
            ],
            citations: [`${fileName1} Chapter 2`],
        },
        {
            answer: `According to your uploaded ${subjectName} material, there are three key aspects to consider: (1) the underlying principles that govern this area, (2) the practical applications that emerge from these principles, and (3) the limitations and edge cases that practitioners must be aware of.`,
            confidence: 'High',
            evidence: [
                `"Three distinct phases characterize this process, each with its own..." — from ${fileName1}, p.7`,
                `"Applications in real-world scenarios demonstrate that..." — from ${fileName2}, Section 4B`,
                `"Notable exceptions include cases where the standard model breaks down..." — from ${fileName1}, p.19`,
            ],
            citations: [`${fileName1} p.7`, `${fileName2} § 4B`, `${fileName1} p.19`],
        },
        {
            answer: `The notes for ${subjectName} provide a moderate-level treatment of this topic. While the core definition is clearly established, some advanced applications may not be fully covered in the current uploaded material.`,
            confidence: 'Low',
            evidence: [
                `"A preliminary definition suggests that..." — from ${fileName1}, Introduction`,
            ],
            citations: [`${fileName1} Introduction`],
        },
    ];

    return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}

/**
 * Generate mock study content (MCQs + short answer).
 *
 * Real API endpoint: POST /api/study-mode
 * Body: { subjectId }
 * Expected response: { mcqs: MCQ[], shortAnswer: ShortAns[] }
 */
export function generateStudyContent(subject) {
    const name = subject?.name || 'Subject';
    const files = subject?.files || [];
    const fileName = files[0]?.name || 'uploaded notes';

    const mcqs = [
        {
            question: `Which of the following best describes the core principle of ${name} as discussed in your notes?`,
            options: [
                'A reductionist approach focusing on individual elements in isolation',
                'A systems approach that considers the interplay of multiple components',
                'An empirical method based solely on observational data',
                'A theoretical framework with no practical application',
            ],
            correctKey: 'B',
            explanation: `Your notes emphasize a holistic, systems-based understanding of ${name}, showing how individual parts interact to produce emergent behaviors.`,
            citation: `${fileName}, Chapter 1`,
        },
        {
            question: `According to your ${name} notes, what is the primary purpose of the foundational framework introduced?`,
            options: [
                'To provide a historical overview of the field',
                'To establish a common vocabulary for communication',
                'To create a unified model that explains observed phenomena',
                'To list all known exceptions to existing theories',
            ],
            correctKey: 'C',
            explanation: `The foundational framework in your notes serves as a unified explanatory model, helping connect disparate observations under a single coherent theory.`,
            citation: `${fileName}, Section 2`,
        },
        {
            question: `Which methodology is emphasized in your ${name} notes for validating theoretical claims?`,
            options: [
                'Purely deductive reasoning from axioms',
                'Expert consensus without empirical testing',
                'Controlled experimentation and peer review',
                'Anecdotal evidence and case studies only',
            ],
            correctKey: 'C',
            explanation: `Your notes stress the importance of rigorous empirical testing and peer review as the gold standard for validating any theoretical proposition in this field.`,
            citation: `${fileName}, p.15`,
        },
        {
            question: `What is a key limitation highlighted in your ${name} notes regarding current approaches?`,
            options: [
                'There are no known limitations',
                'Approaches are too simplistic for modern problems',
                'Scalability and real-world application remain challenging',
                'The field lacks any theoretical foundation',
            ],
            correctKey: 'C',
            explanation: `Your notes candidly discuss how scalability and bridging the gap between theory and real-world application are persistent challenges in the field.`,
            citation: `${fileName}, Section 5`,
        },
        {
            question: `Based on your ${name} notes, which factor most significantly influences outcomes in this domain?`,
            options: [
                'Random chance and unpredictable variables',
                'Initial conditions and boundary parameters',
                'The expertise level of individual practitioners only',
                'Purely external environmental factors',
            ],
            correctKey: 'B',
            explanation: `Your notes demonstrate through multiple examples that initial conditions and boundary parameters have an outsized effect on the eventual outcome, consistent with sensitivity to initial conditions in complex systems.`,
            citation: `${fileName}, Chapter 3`,
        },
    ];

    const shortAnswer = [
        {
            question: `In your own words, explain the fundamental concept introduced in the ${name} notes and why it is important to the field.`,
            answer: `The fundamental concept in your ${name} notes centers on an integrated understanding of the subject that goes beyond surface-level facts. Its importance lies in providing a unified framework that helps practitioners identify patterns, make predictions, and develop solutions that are grounded in well-tested principles rather than trial and error.`,
            citation: `${fileName}, Introduction & Chapter 1`,
        },
        {
            question: `Describe the key steps of the process or methodology outlined in your ${name} notes, and explain how each step contributes to the overall goal.`,
            answer: `Your ${name} notes outline a multi-step methodology: (1) Problem definition and scope setting, which establishes clear objectives; (2) Data collection and analysis, ensuring decisions are evidence-based; (3) Model formulation, which translates observations into actionable frameworks; and (4) Validation and iteration, ensuring the developed solutions hold up under real-world scrutiny. Each step is deliberately sequenced so that outputs from one feed into the next.`,
            citation: `${fileName}, Section 3`,
        },
        {
            question: `What are two major challenges or limitations in ${name} as described in your uploaded notes, and what potential solutions does the material propose?`,
            answer: `Your notes identify two primary challenges: First, the complexity of handling large-scale scenarios where computational or cognitive resources are strained — the notes propose modular decomposition as a mitigation strategy. Second, the difficulty of generalizing findings across different contexts — addressed by developing robust, abstracted models that capture domain-agnostic principles. Both challenges are framed as active research areas with promising directions outlined in the concluding sections.`,
            citation: `${fileName}, Section 5 & Conclusions`,
        },
    ];

    return { mcqs, shortAnswer };
}
