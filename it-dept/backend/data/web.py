import requests
from bs4 import BeautifulSoup
import csv
from datetime import datetime

def clean_text(text):
    if text:
        return ' '.join(text.strip().replace('\n', ' ').split())
    return ''

def scrape_tce_it_academics():
    url = "https://tce.edu/academics/departments/information-technology/academics"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # Theme Area
        theme_area = soup.find('h2', string='Theme Area')
        if theme_area:
            with open(f'theme_area_{timestamp}.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(['Theme Area'])
                writer.writerow([clean_text(theme_area.find_next('p').text)])

        # Courses Offered
        courses_table = soup.find('table')
        if courses_table:
            with open(f'courses_offered_{timestamp}.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(['Sl.No', 'Course Name', 'Syllabus Link'])
                for row in courses_table.find_all('tr')[1:]:  # Skip header row
                    cols = row.find_all('td')
                    if len(cols) >= 2:
                        writer.writerow([
                            clean_text(cols[0].text),
                            clean_text(cols[1].text),
                            cols[2].find('a')['href'] if cols[2].find('a') else ''
                        ])

        # PEOs
        peo_section = soup.find('h2', string='Program Educational Objectives (PEOs)')
        if peo_section:
            with open(f'peos_{timestamp}.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(['Program Educational Objectives'])
                peo_text = peo_section.find_next('p').text
                for peo in peo_text.split('\n'):
                    if peo.strip():
                        writer.writerow([clean_text(peo)])

        # POs
        po_section = soup.find('h2', string='Programme Outcomes (POs)')
        if po_section:
            with open(f'pos_{timestamp}.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(['Programme Outcomes'])
                po_list = po_section.find_next('ol')
                if po_list:
                    for li in po_list.find_all('li'):
                        writer.writerow([clean_text(li.text)])

        # PSOs
        pso_section = soup.find('h2', string='Programme Specific Outcomes (PSOs)')
        if pso_section:
            with open(f'psos_{timestamp}.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(['Programme Specific Outcomes'])
                pso_text = pso_section.find_next('p').text
                for pso in pso_text.split('\n'):
                    if pso.strip():
                        writer.writerow([clean_text(pso)])

        print(f"Academic data has been successfully scraped and saved to CSV files with timestamp {timestamp}")
        
    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    scrape_tce_it_academics()
