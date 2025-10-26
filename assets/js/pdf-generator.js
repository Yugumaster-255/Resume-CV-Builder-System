// PDF Generation and Export functionality
class PDFGenerator {
    constructor() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // PDF generation is handled in main.js
        // This class provides additional PDF customization options
    }
    
    generatePDF(element, options = {}) {
        const defaultOptions = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'resume.pdf',
            image: { 
                type: 'jpeg', 
                quality: 0.98 
            },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                allowTaint: true
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before',
                after: '.page-break-after',
                avoid: '.no-page-break'
            }
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        return html2pdf()
            .set(finalOptions)
            .from(element)
            .save();
    }
    
    generateModernPDF(resumeData) {
        const element = this.createModernResumeElement(resumeData);
        return this.generatePDF(element, {
            filename: `${resumeData.personal.firstName || 'Resume'}_${resumeData.personal.lastName || ''}_Modern.pdf`
        });
    }
    
    generateClassicPDF(resumeData) {
        const element = this.createClassicResumeElement(resumeData);
        return this.generatePDF(element, {
            filename: `${resumeData.personal.firstName || 'Resume'}_${resumeData.personal.lastName || ''}_Classic.pdf`
        });
    }
    
    createModernResumeElement(data) {
        const element = document.createElement('div');
        element.className = 'resume-preview modern-template';
        element.style.cssText = `
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: white;
            padding: 2rem;
            max-width: 8.5in;
            margin: 0 auto;
        `;
        
        element.innerHTML = `
            <div class="resume-header" style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 3px solid #6366f1;">
                <h1 style="font-size: 2.5rem; font-weight: 700; color: #6366f1; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
                    ${data.personal.firstName || ''} ${data.personal.lastName || ''}
                </h1>
                <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; font-size: 0.9rem; color: #6b7280; margin-top: 0.5rem;">
                    ${data.personal.email ? `<span><strong>Email:</strong> ${data.personal.email}</span>` : ''}
                    ${data.personal.phone ? `<span><strong>Phone:</strong> ${data.personal.phone}</span>` : ''}
                    ${data.personal.address ? `<span><strong>Location:</strong> ${data.personal.address}</span>` : ''}
                </div>
            </div>
            
            ${data.personal.objective ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    Career Objective
                </h3>
                <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.7;">${data.personal.objective}</p>
            </div>
            ` : ''}
            
            ${data.education && data.education.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    Education
                </h3>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 3px solid #6366f1;">
                        <h4 style="font-size: 1.1rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">
                            ${edu.degree} ${edu.field ? `in ${edu.field}` : ''}
                        </h4>
                        <div style="font-size: 0.9rem; color: #6b7280; margin-bottom: 0.25rem;">
                            <strong>${edu.institution}</strong>
                            ${edu.startDate ? ` • ${edu.startDate}` : ''}
                            ${edu.endDate ? ` - ${edu.endDate}` : ''}
                        </div>
                        ${edu.grade ? `<div style="font-size: 0.85rem; color: #9ca3af; margin-bottom: 0.5rem;"><strong>Grade:</strong> ${edu.grade}</div>` : ''}
                        ${edu.description ? `<p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-top: 0.5rem;">${edu.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.experience && data.experience.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    Work Experience
                </h3>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 1.2rem; padding-left: 1rem; border-left: 3px solid #6366f1;">
                        <h4 style="font-size: 1.1rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">
                            ${exp.jobTitle}
                        </h4>
                        <div style="font-size: 0.9rem; color: #6b7280; margin-bottom: 0.25rem;">
                            <strong>${exp.company}</strong>
                            ${exp.location ? ` • ${exp.location}` : ''}
                            ${exp.startDate ? ` • ${exp.startDate}` : ''}
                            ${exp.endDate ? ` - ${exp.endDate}` : ''}
                        </div>
                        ${exp.description ? `<p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-top: 0.5rem;">${exp.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.skills ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    Skills
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    ${data.skills.technicalSkills ? `
                        <div>
                            <h5 style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem; font-size: 0.95rem;">Technical Skills</h5>
                            <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">${data.skills.technicalSkills}</p>
                        </div>
                    ` : ''}
                    ${data.skills.softSkills ? `
                        <div>
                            <h5 style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem; font-size: 0.95rem;">Soft Skills</h5>
                            <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">${data.skills.softSkills}</p>
                        </div>
                    ` : ''}
                </div>
                ${data.skills.languages ? `
                    <div style="margin-top: 1rem;">
                        <h5 style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem; font-size: 0.95rem;">Languages</h5>
                        <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">${data.skills.languages}</p>
                    </div>
                ` : ''}
            </div>
            ` : ''}
            
            ${data.certifications && data.certifications.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    Certifications
                </h3>
                ${data.certifications.map(cert => `
                    <div style="margin-bottom: 0.8rem; padding-left: 1rem; border-left: 3px solid #6366f1;">
                        <h4 style="font-size: 1rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">
                            ${cert.name}
                        </h4>
                        <div style="font-size: 0.85rem; color: #6b7280;">
                            ${cert.organization || ''}
                            ${cert.issueDate ? ` • ${cert.issueDate}` : ''}
                            ${cert.credentialId ? ` • ID: ${cert.credentialId}` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.languages && data.languages.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    Languages
                </h3>
                ${data.languages.map(lang => `
                    <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500; color: #1f2937;">${lang.language}</span>
                        <span style="color: #6b7280; font-size: 0.9rem;">${lang.proficiency}</span>
                    </div>
                    ${lang.certification ? `<div style="font-size: 0.8rem; color: #9ca3af; margin-left: 1rem;">${lang.certification}</div>` : ''}
                `).join('')}
            </div>
            ` : ''}
            
            ${data.hobbies ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    Hobbies & Interests
                </h3>
                <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">${data.hobbies}</p>
            </div>
            ` : ''}
            
            ${data.referees && data.referees.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 600; color: #6366f1; margin-bottom: 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    References
                </h3>
                ${data.referees.map(ref => `
                    <div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 3px solid #6366f1;">
                        <h4 style="font-size: 1rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">
                            ${ref.name}
                        </h4>
                        <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0.25rem;">
                            ${ref.position || ''} ${ref.company ? `at ${ref.company}` : ''}
                        </div>
                        <div style="font-size: 0.8rem; color: #9ca3af;">
                            ${ref.email ? `Email: ${ref.email}` : ''}
                            ${ref.phone ? ` • Phone: ${ref.phone}` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        `;
        
        return element;
    }
    
    createClassicResumeElement(data) {
        const element = document.createElement('div');
        element.className = 'resume-preview classic-template';
        element.style.cssText = `
            font-family: 'Times New Roman', serif;
            line-height: 1.5;
            color: #000;
            background: white;
            padding: 1.5rem;
            max-width: 8.5in;
            margin: 0 auto;
        `;
        
        element.innerHTML = `
            <div class="resume-header" style="text-align: center; margin-bottom: 2rem; border-bottom: 1px solid #000; padding-bottom: 1rem;">
                <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase;">
                    ${data.personal.firstName || ''} ${data.personal.lastName || ''}
                </h1>
                <div style="font-size: 0.9rem; margin-top: 0.5rem;">
                    ${data.personal.email ? `${data.personal.email}` : ''}
                    ${data.personal.phone ? ` • ${data.personal.phone}` : ''}
                    ${data.personal.address ? ` • ${data.personal.address}` : ''}
                </div>
            </div>
            
            ${data.personal.objective ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.25rem;">
                    Objective
                </h3>
                <p style="font-size: 0.9rem; line-height: 1.5; text-align: justify;">${data.personal.objective}</p>
            </div>
            ` : ''}
            
            ${data.education && data.education.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.25rem;">
                    Education
                </h3>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                            <h4 style="font-size: 1rem; font-weight: bold;">${edu.degree} ${edu.field ? `in ${edu.field}` : ''}</h4>
                            <span style="font-size: 0.85rem;">${edu.startDate || ''} ${edu.endDate ? `- ${edu.endDate}` : ''}</span>
                        </div>
                        <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">
                            <strong>${edu.institution}</strong>
                            ${edu.grade ? ` • Grade: ${edu.grade}` : ''}
                        </div>
                        ${edu.description ? `<p style="font-size: 0.85rem; line-height: 1.4; margin-top: 0.5rem; text-align: justify;">${edu.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.experience && data.experience.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.25rem;">
                    Work Experience
                </h3>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                            <h4 style="font-size: 1rem; font-weight: bold;">${exp.jobTitle}</h4>
                            <span style="font-size: 0.85rem;">${exp.startDate || ''} ${exp.endDate ? `- ${exp.endDate}` : ''}</span>
                        </div>
                        <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">
                            <strong>${exp.company}</strong>
                            ${exp.location ? `, ${exp.location}` : ''}
                        </div>
                        ${exp.description ? `<p style="font-size: 0.85rem; line-height: 1.4; text-align: justify;">${exp.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.skills ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.25rem;">
                    Skills
                </h3>
                ${data.skills.technicalSkills ? `<p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>Technical Skills:</strong> ${data.skills.technicalSkills}</p>` : ''}
                ${data.skills.softSkills ? `<p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>Soft Skills:</strong> ${data.skills.softSkills}</p>` : ''}
                ${data.skills.languages ? `<p style="font-size: 0.9rem;"><strong>Languages:</strong> ${data.skills.languages}</p>` : ''}
            </div>
            ` : ''}
            
            ${data.certifications && data.certifications.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.25rem;">
                    Certifications
                </h3>
                ${data.certifications.map(cert => `
                    <div style="margin-bottom: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h4 style="font-size: 0.95rem; font-weight: bold;">${cert.name}</h4>
                            <span style="font-size: 0.8rem;">${cert.issueDate || ''}</span>
                        </div>
                        <div style="font-size: 0.85rem; color: #333;">
                            ${cert.organization || ''}
                            ${cert.credentialId ? ` • ID: ${cert.credentialId}` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.referees && data.referees.length > 0 ? `
            <div class="resume-section" style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.25rem;">
                    References
                </h3>
                ${data.referees.map(ref => `
                    <div style="margin-bottom: 0.8rem;">
                        <h4 style="font-size: 0.95rem; font-weight: bold;">${ref.name}</h4>
                        <div style="font-size: 0.85rem;">
                            ${ref.position || ''} ${ref.company ? `at ${ref.company}` : ''}
                        </div>
                        <div style="font-size: 0.8rem; color: #333;">
                            ${ref.email ? `${ref.email}` : ''}
                            ${ref.phone ? ` • ${ref.phone}` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        `;
        
        return element;
    }
    
    // Utility method to format dates for PDF
    formatDateForPDF(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short' 
        });
    }
    
    // Method to add page breaks where needed
    addPageBreaks(element) {
        const sections = element.querySelectorAll('.resume-section');
        sections.forEach((section, index) => {
            if (index > 0 && index % 3 === 0) {
                section.classList.add('page-break-before');
            }
        });
    }
}

// Initialize PDF Generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PDFGenerator();
});
