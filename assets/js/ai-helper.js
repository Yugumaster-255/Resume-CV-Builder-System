// Offline AI Helper for Resume Builder
class AIHelper {
    constructor() {
        this.suggestions = {
            // Career Objectives based on keywords
            objective: {
                'teacher': 'Dedicated and passionate teacher with experience in improving student engagement and performance. Committed to fostering a positive learning environment and helping students achieve their academic goals.',
                'developer': 'Innovative software developer with expertise in modern technologies and a passion for creating efficient, scalable solutions. Committed to continuous learning and delivering high-quality software products.',
                'engineer': 'Results-driven engineer with strong technical skills and experience in problem-solving. Dedicated to applying engineering principles to develop innovative solutions and improve processes.',
                'manager': 'Experienced manager with proven leadership skills and a track record of driving team performance and achieving organizational goals. Committed to fostering collaboration and professional development.',
                'marketing': 'Creative marketing professional with expertise in digital marketing strategies and brand development. Passionate about connecting with audiences and driving business growth through innovative campaigns.',
                'sales': 'Results-oriented sales professional with a proven track record of exceeding targets and building strong client relationships. Committed to understanding customer needs and delivering exceptional value.',
                'healthcare': 'Compassionate healthcare professional dedicated to providing quality patient care and improving health outcomes. Committed to continuous learning and maintaining the highest standards of medical practice.',
                'finance': 'Detail-oriented finance professional with expertise in financial analysis and strategic planning. Committed to ensuring financial stability and supporting business growth through sound financial management.',
                'designer': 'Creative designer with a passion for visual communication and user experience. Committed to creating engaging designs that effectively communicate brand messages and enhance user interactions.',
                'consultant': 'Strategic consultant with expertise in business analysis and process improvement. Committed to helping organizations optimize their operations and achieve sustainable growth.',
                'analyst': 'Analytical professional with strong data interpretation skills and experience in research and reporting. Committed to providing actionable insights that drive informed decision-making.',
                'administrator': 'Organized administrator with excellent multitasking abilities and experience in office management. Committed to ensuring smooth operations and supporting organizational efficiency.',
                'default': 'Motivated professional with strong work ethic and commitment to excellence. Seeking opportunities to contribute skills and experience to a dynamic organization while continuing to grow and develop professionally.'
            },
            
            // Technical Skills suggestions
            technicalSkills: {
                'web': 'HTML5, CSS3, JavaScript, React, Node.js, Express.js, MongoDB, Git, RESTful APIs',
                'mobile': 'React Native, Flutter, Swift, Kotlin, Android Studio, Firebase, App Store deployment',
                'data': 'Python, R, SQL, Tableau, Power BI, Machine Learning, Data Visualization, Statistics',
                'cloud': 'AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD, Infrastructure as Code',
                'design': 'Adobe Creative Suite, Figma, Sketch, UI/UX Design, Prototyping, Wireframing',
                'marketing': 'Google Analytics, Facebook Ads, SEO, Content Marketing, Email Marketing, Social Media',
                'office': 'Microsoft Office Suite, Google Workspace, Project Management tools, CRM systems',
                'default': 'Microsoft Office, Communication tools, Problem-solving, Time management, Team collaboration'
            },
            
            // Soft Skills suggestions
            softSkills: {
                'leadership': 'Leadership, Team Management, Strategic Planning, Decision Making, Conflict Resolution',
                'communication': 'Verbal Communication, Written Communication, Presentation Skills, Active Listening',
                'analytical': 'Critical Thinking, Problem Solving, Data Analysis, Research, Attention to Detail',
                'creative': 'Creativity, Innovation, Design Thinking, Adaptability, Open-mindedness',
                'interpersonal': 'Teamwork, Collaboration, Empathy, Cultural Awareness, Relationship Building',
                'default': 'Communication, Teamwork, Problem Solving, Time Management, Adaptability, Leadership'
            },
            
            // Experience descriptions
            experience: {
                'developer': 'Developed and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions. Implemented best practices for code quality and performance optimization.',
                'teacher': 'Planned and delivered engaging lessons to diverse student populations. Assessed student progress and provided constructive feedback. Collaborated with colleagues to develop curriculum and improve teaching methods.',
                'manager': 'Led and motivated teams to achieve organizational objectives. Developed and implemented strategic plans. Managed budgets and resources effectively while maintaining high performance standards.',
                'sales': 'Exceeded sales targets through relationship building and strategic approach. Identified customer needs and provided tailored solutions. Maintained detailed records and provided regular reports to management.',
                'marketing': 'Developed and executed marketing campaigns across multiple channels. Analyzed market trends and competitor activities. Collaborated with creative teams to produce compelling marketing materials.',
                'analyst': 'Analyzed data to identify trends and provide actionable insights. Created reports and presentations for stakeholders. Collaborated with teams to implement data-driven solutions.',
                'default': 'Contributed to team objectives through effective collaboration and individual initiative. Maintained high standards of work quality and productivity. Demonstrated strong problem-solving and communication skills.'
            },
            
            // Education descriptions
            education: {
                'computer': 'Comprehensive study of computer science fundamentals including programming, algorithms, data structures, and software engineering. Completed projects in web development, database management, and system design.',
                'business': 'Focused study of business principles including management, marketing, finance, and operations. Developed analytical and strategic thinking skills through case studies and practical applications.',
                'engineering': 'Rigorous engineering curriculum covering mathematics, physics, and specialized engineering principles. Gained hands-on experience through laboratory work and design projects.',
                'education': 'Comprehensive teacher education program covering pedagogy, curriculum development, and classroom management. Completed practicum experiences in diverse educational settings.',
                'medicine': 'Intensive medical education covering human anatomy, physiology, pathology, and clinical practice. Gained practical experience through clinical rotations and patient care.',
                'default': 'Comprehensive academic program providing strong foundation in core subjects. Developed critical thinking, research, and analytical skills through coursework and projects.'
            },
            
            // Hobbies suggestions
            hobbies: {
                'creative': 'Photography, Painting, Writing, Music, Graphic Design, Creative Writing, Digital Art',
                'sports': 'Football, Basketball, Running, Swimming, Tennis, Volleyball, Fitness Training',
                'intellectual': 'Reading, Chess, Puzzles, Learning Languages, Research, Writing, Debating',
                'social': 'Volunteering, Community Service, Mentoring, Networking, Social Events, Cultural Activities',
                'technical': 'Programming, Electronics, Robotics, 3D Printing, Gaming, Technology Exploration',
                'outdoor': 'Hiking, Camping, Gardening, Nature Photography, Travel, Adventure Sports',
                'default': 'Reading, Sports, Music, Travel, Photography, Learning, Community Service'
            },
            
            // Language suggestions
            languages: {
                'tanzania': 'Swahili (Native), English (Fluent), Arabic (Basic)',
                'kenya': 'Swahili (Native), English (Fluent), Kikuyu (Basic)',
                'uganda': 'English (Fluent), Luganda (Native), Swahili (Basic)',
                'default': 'English (Fluent), Swahili (Conversational)'
            }
        };
        
        this.tanzanianCities = [
            'Dar es Salaam', 'Arusha', 'Dodoma', 'Mwanza', 'Tanga', 'Morogoro', 
            'Mbeya', 'Tabora', 'Kigoma', 'Mtwara', 'Iringa', 'Songea'
        ];
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // AI Suggest buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('ai-suggest-btn') || e.target.closest('.ai-suggest-btn')) {
                const button = e.target.closest('.ai-suggest-btn');
                const field = button.dataset.field;
                const textarea = button.parentElement.querySelector('textarea');
                
                if (textarea) {
                    this.generateSuggestion(field, textarea);
                }
            }
        });
    }
    
    generateSuggestion(field, textarea) {
        const currentText = textarea.value.toLowerCase();
        let suggestion = '';
        
        // Show loading animation
        const originalText = textarea.value;
        textarea.value = 'AI is thinking...';
        textarea.style.color = '#6366f1';
        
        // Simulate AI thinking time
        setTimeout(() => {
            suggestion = this.getSuggestionForField(field, currentText);
            textarea.value = suggestion;
            textarea.style.color = '';
            
            // Add success animation
            textarea.classList.add('success-animation');
            setTimeout(() => {
                textarea.classList.remove('success-animation');
            }, 600);
            
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
    
    getSuggestionForField(field, currentText) {
        switch (field) {
            case 'objective':
                return this.getObjectiveSuggestion(currentText);
            case 'technicalSkills':
                return this.getTechnicalSkillsSuggestion(currentText);
            case 'softSkills':
                return this.getSoftSkillsSuggestion(currentText);
            case 'experience':
                return this.getExperienceSuggestion(currentText);
            case 'education':
                return this.getEducationSuggestion(currentText);
            case 'hobbies':
                return this.getHobbiesSuggestion(currentText);
            case 'languages':
                return this.getLanguagesSuggestion(currentText);
            default:
                return this.getDefaultSuggestion(field, currentText);
        }
    }
    
    getObjectiveSuggestion(currentText) {
        const keywords = Object.keys(this.suggestions.objective);
        
        for (let keyword of keywords) {
            if (currentText.includes(keyword)) {
                return this.suggestions.objective[keyword];
            }
        }
        
        return this.suggestions.objective.default;
    }
    
    getTechnicalSkillsSuggestion(currentText) {
        const keywords = Object.keys(this.suggestions.technicalSkills);
        
        for (let keyword of keywords) {
            if (currentText.includes(keyword)) {
                return this.suggestions.technicalSkills[keyword];
            }
        }
        
        return this.suggestions.technicalSkills.default;
    }
    
    getSoftSkillsSuggestion(currentText) {
        const keywords = Object.keys(this.suggestions.softSkills);
        
        for (let keyword of keywords) {
            if (currentText.includes(keyword)) {
                return this.suggestions.softSkills[keyword];
            }
        }
        
        return this.suggestions.softSkills.default;
    }
    
    getExperienceSuggestion(currentText) {
        const keywords = Object.keys(this.suggestions.experience);
        
        for (let keyword of keywords) {
            if (currentText.includes(keyword)) {
                return this.suggestions.experience[keyword];
            }
        }
        
        return this.suggestions.experience.default;
    }
    
    getEducationSuggestion(currentText) {
        const keywords = Object.keys(this.suggestions.education);
        
        for (let keyword of keywords) {
            if (currentText.includes(keyword)) {
                return this.suggestions.education[keyword];
            }
        }
        
        return this.suggestions.education.default;
    }
    
    getHobbiesSuggestion(currentText) {
        const keywords = Object.keys(this.suggestions.hobbies);
        
        for (let keyword of keywords) {
            if (currentText.includes(keyword)) {
                return this.suggestions.hobbies[keyword];
            }
        }
        
        return this.suggestions.hobbies.default;
    }
    
    getLanguagesSuggestion(currentText) {
        const keywords = Object.keys(this.suggestions.languages);
        
        for (let keyword of keywords) {
            if (currentText.includes(keyword)) {
                return this.suggestions.languages[keyword];
            }
        }
        
        return this.suggestions.languages.default;
    }
    
    getDefaultSuggestion(field, currentText) {
        // Generic suggestions based on field type
        const genericSuggestions = {
            'description': 'Demonstrated strong performance in this role with focus on quality and efficiency. Collaborated effectively with team members and contributed to achieving organizational goals.',
            'achievements': 'Successfully completed projects ahead of schedule while maintaining high quality standards. Received positive feedback from supervisors and colleagues.',
            'responsibilities': 'Managed daily operations and ensured smooth workflow. Coordinated with various departments to meet project deadlines and objectives.'
        };
        
        return genericSuggestions[field] || 'Professional experience with focus on quality and results. Strong work ethic and commitment to excellence.';
    }
    
    // Enhanced AI suggestions with context awareness
    getContextualSuggestion(field, currentText, userData = {}) {
        let suggestion = this.getSuggestionForField(field, currentText);
        
        // Add Tanzanian context if relevant
        if (userData.nationality === 'Tanzanian' || userData.address?.includes('Tanzania')) {
            suggestion = this.addTanzanianContext(suggestion, field);
        }
        
        // Add industry-specific context
        if (userData.experience && userData.experience.length > 0) {
            const lastJob = userData.experience[userData.experience.length - 1];
            if (lastJob.jobTitle) {
                suggestion = this.addIndustryContext(suggestion, lastJob.jobTitle, field);
            }
        }
        
        return suggestion;
    }
    
    addTanzanianContext(suggestion, field) {
        const tanzanianAdditions = {
            'objective': ' with experience working in the Tanzanian market and understanding of local business practices.',
            'experience': ' in the Tanzanian business environment, contributing to local economic development.',
            'education': ' with focus on practical applications relevant to the Tanzanian context.'
        };
        
        return suggestion + (tanzanianAdditions[field] || '');
    }
    
    addIndustryContext(suggestion, jobTitle, field) {
        const industryKeywords = {
            'tech': ['developer', 'programmer', 'engineer', 'analyst'],
            'healthcare': ['nurse', 'doctor', 'medical', 'health'],
            'education': ['teacher', 'lecturer', 'educator', 'instructor'],
            'finance': ['accountant', 'banker', 'financial', 'auditor'],
            'marketing': ['marketer', 'sales', 'promotion', 'advertising']
        };
        
        const jobTitleLower = jobTitle.toLowerCase();
        
        for (let [industry, keywords] of Object.entries(industryKeywords)) {
            if (keywords.some(keyword => jobTitleLower.includes(keyword))) {
                return this.addIndustrySpecificContext(suggestion, industry, field);
            }
        }
        
        return suggestion;
    }
    
    addIndustrySpecificContext(suggestion, industry, field) {
        const industryContexts = {
            'tech': {
                'experience': ' with focus on modern software development practices and agile methodologies.',
                'objective': ' with passion for technology innovation and digital transformation.'
            },
            'healthcare': {
                'experience': ' with commitment to patient care and medical excellence.',
                'objective': ' with dedication to improving healthcare outcomes and patient well-being.'
            },
            'education': {
                'experience': ' with focus on student development and educational excellence.',
                'objective': ' with passion for education and student success.'
            }
        };
        
        const context = industryContexts[industry]?.[field];
        return context ? suggestion + context : suggestion;
    }
    
    // Smart suggestions based on user input patterns
    getSmartSuggestion(field, currentText, userHistory = {}) {
        // Analyze user's previous inputs to provide more personalized suggestions
        if (userHistory[field]) {
            const previousInputs = userHistory[field];
            const commonWords = this.extractCommonWords(previousInputs);
            
            if (commonWords.length > 0) {
                return this.buildPersonalizedSuggestion(field, commonWords);
            }
        }
        
        return this.getSuggestionForField(field, currentText);
    }
    
    extractCommonWords(inputs) {
        const wordCount = {};
        inputs.forEach(input => {
            const words = input.toLowerCase().split(/\s+/);
            words.forEach(word => {
                if (word.length > 3) { // Only count words longer than 3 characters
                    wordCount[word] = (wordCount[word] || 0) + 1;
                }
            });
        });
        
        return Object.entries(wordCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([word]) => word);
    }
    
    buildPersonalizedSuggestion(field, commonWords) {
        const baseSuggestion = this.getSuggestionForField(field, '');
        const personalizedPart = commonWords.join(', ');
        
        return `${baseSuggestion} Specialized in ${personalizedPart}.`;
    }
}

// Initialize AI Helper when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIHelper();
});
