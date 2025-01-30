# Senior Design

**Proposal for a Website for Phishing and Suspicious file Detection**

By Phoi Luong,  Zoey Bennett, and Christina Krebs

Our project is a comprehensive web-based malware detection platform designed to help users identify and address potential security threats. Users can submit suspicious links or upload files for analysis, and the platform will conduct URL checks for malicious patterns, SSL certificate validity, and other indicators of potential danger. Uploaded files are analyzed using integrated APIs such as VirusTotal, providing detailed insights into threats like malware, phishing, or other vulnerabilities.

The platform generates user-friendly reports that include risk levels, the origin of threats, and actionable recommendations, enabling users to make informed decisions about their submissions. To further support users, the platform features a dedicated learning section for those who may be unsure about handling suspicious files or links. This section covers common phishing attacks, tips for recognizing malicious content, and instructions on how to report suspicious emails or files to appropriate authorities

**Technologies Used** 

1.  GitHub for project management/development
    
2.  Front-end
    
    1.  HTML, CSS, JavaScript
        
    2.  For user interface, we want to develop a simple landing page that prompts users to submit a file or URL
        
    3.  After some time, once the submitted information 
        
3.  Back-end 
    
    1.  Nodejs
        
    2.  Will handle backend processing, such as analyzing URL structures and communicating with external APIs like VirusTotal or Google Safe Browsing.
        
4.  Database
    
    1.  PostgreSQL (to store flagged URLs and files)
        
5.  APIs
    
    1.  API Integration:
        
        1.  **URL Analysis:** Validate URLs and send them to Google Safe Browsing or VirusTotal.
            
        2.  **File Scanning:** Upload files to VirusTotal for analysis.
            
        3.  **SSL Certification Validation:** VirusTotal
            
6.  Deployment
    
    1.  Fly.io for web hosting
