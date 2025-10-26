// Main Application Logic
class ResumeBuilder {
    constructor() {
        this.currentTemplate = 'modern';
        this.currentTheme = 'light';
        this.resumeData = this.loadResumeData();
        this.currentSection = 'personal';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedData();
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupTemplateToggle();
        this.setupFormHandlers();
        this.setupDynamicSections();
        this.setupPreviewModal();
        this.setupExportImport();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Form auto-save
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                this.saveResumeData();
            });
        });

        // Preview and Download buttons
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreview();
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadPDF();
        });

        document.getElementById('downloadFromPreview').addEventListener('click', () => {
            this.downloadPDF();
        });
    }

    setupNavigation() {
        // Show first section by default
        this.showSection('personal');
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Activate corresponding nav link
        const targetLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }

        this.currentSection = sectionName;
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('resumeTheme') || 'light';
        
        this.setTheme(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(this.currentTheme);
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('resumeTheme', theme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    setupTemplateToggle() {
        const templateToggle = document.getElementById('templateToggle');
        const savedTemplate = localStorage.getItem('resumeTemplate') || 'modern';
        
        this.setTemplate(savedTemplate);
        
        templateToggle.addEventListener('click', () => {
            this.currentTemplate = this.currentTemplate === 'modern' ? 'classic' : 'modern';
            this.setTemplate(this.currentTemplate);
        });
    }

    setTemplate(template) {
        this.currentTemplate = template;
        localStorage.setItem('resumeTemplate', template);
        
        const templateText = document.querySelector('#templateToggle span');
        templateText.textContent = template === 'modern' ? 'Modern' : 'Classic';
    }

    setupFormHandlers() {
        // Auto-save on form changes
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('input', () => {
                this.saveResumeData();
            });
        });
    }

    setupDynamicSections() {
        // Education
        document.getElementById('addEducation').addEventListener('click', () => {
            this.addEducationItem();
        });

        // Experience
        document.getElementById('addExperience').addEventListener('click', () => {
            this.addExperienceItem();
        });

        // Certifications
        document.getElementById('addCertification').addEventListener('click', () => {
            this.addCertificationItem();
        });

        // Languages
        document.getElementById('addLanguage').addEventListener('click', () => {
            this.addLanguageItem();
        });

        // Referees
        document.getElementById('addReferee').addEventListener('click', () => {
            this.addRefereeItem();
        });
    }

    addEducationItem() {
        const container = document.getElementById('educationContainer');
        const newItem = this.createEducationItem();
        container.appendChild(newItem);
        this.setupRemoveButton(newItem);
    }

    createEducationItem() {
        const item = document.createElement('div');
        item.className = 'education-item';
        item.innerHTML = `
            <form class="resume-form education-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Institution *</label>
                        <input type="text" name="institution" required placeholder="e.g., University of Dar es Salaam">
                    </div>
                    <div class="form-group">
                        <label>Degree/Certificate *</label>
                        <input type="text" name="degree" required placeholder="e.g., Bachelor of Science">
                    </div>
                    <div class="form-group">
                        <label>Field of Study</label>
                        <input type="text" name="field" placeholder="e.g., Computer Science">
                    </div>
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="month" name="startDate">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="month" name="endDate">
                    </div>
                    <div class="form-group">
                        <label>GPA/Grade</label>
                        <input type="text" name="grade" placeholder="e.g., 3.8/4.0">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <div class="ai-suggest-container">
                        <textarea name="description" rows="3" placeholder="Describe your academic achievements, relevant coursework, or projects..."></textarea>
                        <button type="button" class="ai-suggest-btn" data-field="education">
                            <i class="fas fa-magic"></i>
                            AI Suggest
                        </button>
                    </div>
                </div>
            </form>
        `;
        
        // Setup form handlers for new item
        this.setupFormHandlersForItem(item);
        return item;
    }

    addExperienceItem() {
        const container = document.getElementById('experienceContainer');
        const newItem = this.createExperienceItem();
        container.appendChild(newItem);
        this.setupRemoveButton(newItem);
    }

    createExperienceItem() {
        const item = document.createElement('div');
        item.className = 'experience-item';
        item.innerHTML = `
            <form class="resume-form experience-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Job Title *</label>
                        <input type="text" name="jobTitle" required placeholder="e.g., Software Developer">
                    </div>
                    <div class="form-group">
                        <label>Company *</label>
                        <input type="text" name="company" required placeholder="e.g., Tech Solutions Ltd">
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" name="location" placeholder="e.g., Dar es Salaam, Tanzania">
                    </div>
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="month" name="startDate">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="month" name="endDate">
                        <label class="checkbox-label">
                            <input type="checkbox" name="currentJob"> Currently Working Here
                        </label>
                    </div>
                    <div class="form-group">
                        <label>Employment Type</label>
                        <select name="employmentType">
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Job Description & Achievements</label>
                    <div class="ai-suggest-container">
                        <textarea name="description" rows="4" placeholder="Describe your responsibilities, achievements, and impact in this role..."></textarea>
                        <button type="button" class="ai-suggest-btn" data-field="experience">
                            <i class="fas fa-magic"></i>
                            AI Suggest
                        </button>
                    </div>
                </div>
            </form>
        `;
        
        this.setupFormHandlersForItem(item);
        return item;
    }

    addCertificationItem() {
        const container = document.getElementById('certificationsContainer');
        const newItem = this.createCertificationItem();
        container.appendChild(newItem);
        this.setupRemoveButton(newItem);
    }

    createCertificationItem() {
        const item = document.createElement('div');
        item.className = 'certification-item';
        item.innerHTML = `
            <form class="resume-form certification-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Certification Name *</label>
                        <input type="text" name="name" required placeholder="e.g., AWS Certified Developer">
                    </div>
                    <div class="form-group">
                        <label>Issuing Organization</label>
                        <input type="text" name="organization" placeholder="e.g., Amazon Web Services">
                    </div>
                    <div class="form-group">
                        <label>Issue Date</label>
                        <input type="month" name="issueDate">
                    </div>
                    <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="month" name="expiryDate">
                    </div>
                    <div class="form-group">
                        <label>Credential ID</label>
                        <input type="text" name="credentialId" placeholder="e.g., AWS-123456">
                    </div>
                    <div class="form-group">
                        <label>Verification URL</label>
                        <input type="url" name="verificationUrl" placeholder="https://...">
                    </div>
                </div>
            </form>
        `;
        
        this.setupFormHandlersForItem(item);
        return item;
    }

    addLanguageItem() {
        const container = document.getElementById('languagesContainer');
        const newItem = this.createLanguageItem();
        container.appendChild(newItem);
        this.setupRemoveButton(newItem);
    }

    createLanguageItem() {
        const item = document.createElement('div');
        item.className = 'language-item';
        item.innerHTML = `
            <form class="resume-form language-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Language *</label>
                        <input type="text" name="language" required placeholder="e.g., English">
                    </div>
                    <div class="form-group">
                        <label>Proficiency Level</label>
                        <select name="proficiency">
                            <option value="Native">Native</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Basic">Basic</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Certification (Optional)</label>
                        <input type="text" name="certification" placeholder="e.g., IELTS 7.5">
                    </div>
                </div>
            </form>
        `;
        
        this.setupFormHandlersForItem(item);
        return item;
    }

    addRefereeItem() {
        const container = document.getElementById('refereesContainer');
        const newItem = this.createRefereeItem();
        container.appendChild(newItem);
        this.setupRemoveButton(newItem);
    }

    createRefereeItem() {
        const item = document.createElement('div');
        item.className = 'referee-item';
        item.innerHTML = `
            <form class="resume-form referee-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required placeholder="e.g., John Doe">
                    </div>
                    <div class="form-group">
                        <label>Position/Title</label>
                        <input type="text" name="position" placeholder="e.g., Senior Manager">
                    </div>
                    <div class="form-group">
                        <label>Company/Organization</label>
                        <input type="text" name="company" placeholder="e.g., ABC Company Ltd">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="john.doe@company.com">
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone" placeholder="+255 123 456 789">
                    </div>
                    <div class="form-group">
                        <label>Relationship</label>
                        <input type="text" name="relationship" placeholder="e.g., Former Supervisor">
                    </div>
                </div>
            </form>
        `;
        
        this.setupFormHandlersForItem(item);
        return item;
    }

    setupRemoveButton(item) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item-btn';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.addEventListener('click', () => {
            item.remove();
            this.saveResumeData();
        });
        item.appendChild(removeBtn);
    }

    setupFormHandlersForItem(item) {
        item.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                this.saveResumeData();
            });
        });
    }

    setupPreviewModal() {
        const modal = document.getElementById('previewModal');
        const closeBtn = document.getElementById('closePreview');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    showPreview() {
        const modal = document.getElementById('previewModal');
        const previewContainer = document.getElementById('resumePreview');
        
        // Generate resume HTML
        const resumeHTML = this.generateResumeHTML();
        previewContainer.innerHTML = resumeHTML;
        
        modal.classList.add('show');
    }

    generateResumeHTML() {
        const data = this.getFormData();
        
        if (this.currentTemplate === 'classic') {
            return this.generateClassicTemplate(data);
        } else {
            return this.generateModernTemplate(data);
        }
    }

    generateModernTemplate(data) {
        return `
            <div class="resume-preview">
                <div class="resume-header">
                    <h1 class="resume-name">${data.personal.firstName || ''} ${data.personal.lastName || ''}</h1>
                    <div class="resume-contact">
                        ${data.personal.email ? `<span><i class="fas fa-envelope"></i> ${data.personal.email}</span>` : ''}
                        ${data.personal.phone ? `<span><i class="fas fa-phone"></i> ${data.personal.phone}</span>` : ''}
                        ${data.personal.address ? `<span><i class="fas fa-map-marker-alt"></i> ${data.personal.address}</span>` : ''}
                    </div>
                </div>
                
                ${data.personal.objective ? `
                <div class="resume-section">
                    <h3>Career Objective</h3>
                    <p>${data.personal.objective}</p>
                </div>
                ` : ''}
                
                ${data.education && data.education.length > 0 ? `
                <div class="resume-section">
                    <h3>Education</h3>
                    ${data.education.map(edu => `
                        <div class="resume-item">
                            <h4>${edu.degree} ${edu.field ? `in ${edu.field}` : ''}</h4>
                            <div class="meta">${edu.institution} ${edu.startDate ? `• ${edu.startDate}` : ''} ${edu.endDate ? `- ${edu.endDate}` : ''}</div>
                            ${edu.grade ? `<div class="meta">Grade: ${edu.grade}</div>` : ''}
                            ${edu.description ? `<p>${edu.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${data.experience && data.experience.length > 0 ? `
                <div class="resume-section">
                    <h3>Work Experience</h3>
                    ${data.experience.map(exp => `
                        <div class="resume-item">
                            <h4>${exp.jobTitle}</h4>
                            <div class="meta">${exp.company} ${exp.location ? `• ${exp.location}` : ''} ${exp.startDate ? `• ${exp.startDate}` : ''} ${exp.endDate ? `- ${exp.endDate}` : ''}</div>
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${data.skills ? `
                <div class="resume-section">
                    <h3>Skills</h3>
                    ${data.skills.technicalSkills ? `<p><strong>Technical Skills:</strong> ${data.skills.technicalSkills}</p>` : ''}
                    ${data.skills.softSkills ? `<p><strong>Soft Skills:</strong> ${data.skills.softSkills}</p>` : ''}
                    ${data.skills.languages ? `<p><strong>Languages:</strong> ${data.skills.languages}</p>` : ''}
                </div>
                ` : ''}
                
                ${data.certifications && data.certifications.length > 0 ? `
                <div class="resume-section">
                    <h3>Certifications</h3>
                    ${data.certifications.map(cert => `
                        <div class="resume-item">
                            <h4>${cert.name}</h4>
                            <div class="meta">${cert.organization || ''} ${cert.issueDate ? `• ${cert.issueDate}` : ''}</div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${data.languages && data.languages.length > 0 ? `
                <div class="resume-section">
                    <h3>Languages</h3>
                    ${data.languages.map(lang => `
                        <div class="resume-item">
                            <h4>${lang.language} - ${lang.proficiency}</h4>
                            ${lang.certification ? `<div class="meta">${lang.certification}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${data.hobbies ? `
                <div class="resume-section">
                    <h3>Hobbies & Interests</h3>
                    <p>${data.hobbies}</p>
                </div>
                ` : ''}
                
                ${data.referees && data.referees.length > 0 ? `
                <div class="resume-section">
                    <h3>Referees</h3>
                    ${data.referees.map(ref => `
                        <div class="resume-item">
                            <h4>${ref.name}</h4>
                            <div class="meta">${ref.position || ''} ${ref.company ? `at ${ref.company}` : ''}</div>
                            ${ref.email ? `<div class="meta">${ref.email}</div>` : ''}
                            ${ref.phone ? `<div class="meta">${ref.phone}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `;
    }

    generateClassicTemplate(data) {
        // Similar to modern but with more formal styling
        return this.generateModernTemplate(data);
    }

    getFormData() {
        const data = {
            personal: this.getSectionData('personalForm'),
            education: this.getDynamicSectionData('educationContainer', 'education-form'),
            experience: this.getDynamicSectionData('experienceContainer', 'experience-form'),
            skills: this.getSectionData('skillsForm'),
            certifications: this.getDynamicSectionData('certificationsContainer', 'certification-form'),
            languages: this.getDynamicSectionData('languagesContainer', 'language-form'),
            hobbies: this.getSectionData('hobbiesForm'),
            referees: this.getDynamicSectionData('refereesContainer', 'referee-form')
        };
        
        return data;
    }

    getSectionData(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    getDynamicSectionData(containerId, formClass) {
        const container = document.getElementById(containerId);
        if (!container) return [];
        
        const items = container.querySelectorAll(`.${formClass}`);
        const data = [];
        
        items.forEach(item => {
            const formData = new FormData(item);
            const itemData = {};
            
            for (let [key, value] of formData.entries()) {
                itemData[key] = value;
            }
            
            data.push(itemData);
        });
        
        return data;
    }

    loadResumeData() {
        const saved = localStorage.getItem('resumeData');
        return saved ? JSON.parse(saved) : {};
    }

    saveResumeData() {
        const data = this.getFormData();
        localStorage.setItem('resumeData', JSON.stringify(data));
    }

    loadSavedData() {
        const data = this.resumeData;
        
        // Load personal data
        if (data.personal) {
            Object.keys(data.personal).forEach(key => {
                const input = document.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data.personal[key];
                }
            });
        }
        
        // Load other sections...
        this.loadDynamicSections(data);
    }

    loadDynamicSections(data) {
        // Load education
        if (data.education && data.education.length > 0) {
            const container = document.getElementById('educationContainer');
            container.innerHTML = '';
            
            data.education.forEach((edu, index) => {
                if (index === 0) {
                    // Fill first form
                    Object.keys(edu).forEach(key => {
                        const input = container.querySelector(`[name="${key}"]`);
                        if (input) input.value = edu[key];
                    });
                } else {
                    // Add additional forms
                    const newItem = this.createEducationItem();
                    container.appendChild(newItem);
                    Object.keys(edu).forEach(key => {
                        const input = newItem.querySelector(`[name="${key}"]`);
                        if (input) input.value = edu[key];
                    });
                }
            });
        }
        
        // Similar for other dynamic sections...
    }

    setupExportImport() {
        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });
        
        // Import button
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        
        // File input change
        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
    }

    exportData() {
        const data = this.getFormData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume-data.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }

    importData(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.loadImportedData(data);
                this.saveResumeData();
                location.reload(); // Refresh to show imported data
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }

    loadImportedData(data) {
        // Load all sections with imported data
        this.loadSavedData();
    }

    downloadPDF() {
        const previewContainer = document.getElementById('resumePreview');
        if (!previewContainer.innerHTML) {
            this.showPreview();
        }
        
        // Use html2pdf.js to generate PDF
        const element = previewContainer;
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeBuilder();
});
