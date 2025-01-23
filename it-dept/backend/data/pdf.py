import PyPDF2
import re

class SyllabusParser:
    def __init__(self):
        self.course_data = {
            "code": "",
            "name": "",
            "credits": {
                "L": 0,
                "T": 0, 
                "P": 0,
                "total": 0
            },
            "course_outcomes": [],
            "modules": [],
            "textbooks": [],
            "references": [],
            "course_designers": []
        }

    def parse_pdf(self, pdf_path):
        try:
            with open(pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text()
                
                # Parse different sections
                self._parse_course_info(text)
                self._parse_course_outcomes(text)
                self._parse_modules(text)
                self._parse_references(text)
                self._parse_course_designers(text)
                
                return self.course_data

        except Exception as e:
            print(f"Error parsing PDF: {e}")
            return None

    def _parse_course_info(self, text):
        # Pattern for course code and name
        course_pattern = r'(\d{2}[A-Z]{2}\d{3})\s+([A-Z\s]+)'
        match = re.search(course_pattern, text)
        if match:
            self.course_data["code"] = match.group(1)
            self.course_data["name"] = match.group(2).strip()

        # Pattern for credits
        credits_pattern = r'L\s+T\s+P\s+C\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)'
        match = re.search(credits_pattern, text)
        if match:
            self.course_data["credits"]["L"] = int(match.group(1))
            self.course_data["credits"]["T"] = int(match.group(2))
            self.course_data["credits"]["P"] = int(match.group(3))
            self.course_data["credits"]["total"] = int(match.group(4))

    def _parse_course_outcomes(self, text):
        co_pattern = r'CO(\d+)[:\s]+([^\n]+)'
        matches = re.finditer(co_pattern, text)
        for match in matches:
            co = {
                "number": int(match.group(1)),
                "description": match.group(2).strip()
            }
            self.course_data["course_outcomes"].append(co)

    def _parse_modules(self, text):
        # Find module sections
        module_pattern = r'Module\s+(\d+)[:\s]+([^\n]+)'
        module_matches = re.finditer(module_pattern, text)
        
        for match in module_matches:
            module = {
                "number": int(match.group(1)),
                "title": match.group(2).strip(),
                "topics": []
            }
            
            # Find topics within module
            topic_pattern = r'(\d+\.\d+)\s+([^\n]+)'
            topic_matches = re.finditer(topic_pattern, text)
            
            for topic_match in topic_matches:
                topic = {
                    "number": topic_match.group(1),
                    "description": topic_match.group(2).strip()
                }
                module["topics"].append(topic)
                
            self.course_data["modules"].append(module)

    def _parse_references(self, text):
        # Pattern for textbooks and references
        ref_pattern = r'(?:Text Books?|Reference Books?)[:\s]+\n((?:(?:\d+\.|\*)[^\n]+\n)+)'
        matches = re.finditer(ref_pattern, text)
        
        for match in matches:
            refs = match.group(1).strip().split('\n')
            for ref in refs:
                if ref.strip():
                    self.course_data["references"].append(ref.strip())

    def _parse_course_designers(self, text):
        designer_pattern = r'Course Designers?\s*\n((?:(?:\d+\.|\*)[^\n]+\n)+)'
        match = re.search(designer_pattern, text)
        if match:
            designers = match.group(1).strip().split('\n')
            for designer in designers:
                if designer.strip():
                    self.course_data["course_designers"].append(designer.strip())


# Example usage
parser = SyllabusParser()
syllabus_data = parser.parse_pdf("/Users/sudharson/Desktop/infinix/it-syllabus-2022-onwards.pdf")

if syllabus_data:
    print("Course Code:", syllabus_data["code"])
    print("Course Name:", syllabus_data["name"])
    print("\nCourse Outcomes:")
    print(syllabus_data)
    for co in syllabus_data["course_outcomes"]:
        print(f"CO{co['number']}: {co['description']}")
    # ... print other sections as needed