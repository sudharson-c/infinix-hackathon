import requests
from bs4 import BeautifulSoup
import csv

def scrape_tce_faculty():
    url = "https://tce.edu/academics/departments/information-technology/faculty"
    
    try:
        # Headers to mimic browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Send GET request
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all faculty entries using the specific class structure
        faculty_entries = soup.find_all('div', class_='faculty-view')
        
        if not faculty_entries:
            print("No faculty entries found. The website structure might have changed.")
            return None
            
        faculty_list = []
        
        for entry in faculty_entries:
            try:
                # Find name using the specific field class
                name_tag = entry.find('div', class_='views-field-field-staffname')
                name = name_tag.find('div', class_='field-content').text.strip() if name_tag else ""
                
                # Find designation using the specific field class
                designation_tag = entry.find('div', class_='views-field-field-designation')
                designation = designation_tag.find('div', class_='field-content').text.strip() if designation_tag else ""
                
                # Find email using the specific field class
                email_tag = entry.find('div', class_='views-field-field-email')
                email = email_tag.find('div', class_='field-content').text.strip() if email_tag else ""
                
                # Find image URL
                image_tag = entry.find('div', class_='views-field-field-image')
                image_url = ""
                if image_tag and image_tag.find('img'):
                    image_url = "https://tce.edu" + image_tag.find('img')['src']
                
                # Find profile link
                profile_tag = entry.find('div', class_='views-field-description__value')
                profile_url = ""
                if profile_tag and profile_tag.find('a'):
                    profile_url = "https://tce.edu" + profile_tag.find('a')['href']
                
                # Only add faculty if we found at least a name
                if name:
                    faculty_dict = {
                        'name': name,
                        'designation': designation,
                        'email': email.replace(' [at] ', '@').replace(' [dot] ', '.'),
                        'image_url': image_url,
                        'profile_url': profile_url
                    }
                    faculty_list.append(faculty_dict)
                    print(f"Found faculty member: {name}")  # Debug print
                
            except AttributeError as e:
                print(f"Error processing faculty entry: {e}")
                continue
        
        if not faculty_list:
            print("No faculty data could be extracted. Please check the website structure.")
            return None
            
        return faculty_list

    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

def save_to_csv(faculty_data, filename='faculty_data.csv'):
    """
    Save faculty data to a CSV file
    
    Parameters:
    faculty_data (list): List of faculty dictionaries
    filename (str): Name of the CSV file to save
    """
    if not faculty_data:
        return False
        
    try:
        with open(filename, 'w', newline='', encoding='utf-8') as file:
            # Define the fieldnames based on our dictionary keys
            fieldnames = ['name', 'designation', 'email', 'image_url', 'profile_url']
            
            # Create CSV writer
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            
            # Write the header
            writer.writeheader()
            
            # Write the data
            writer.writerows(faculty_data)
            
        print(f"\nData successfully saved to {filename}")
        return True
        
    except Exception as e:
        print(f"Error saving to CSV: {e}")
        return False

# Run the scraper
if __name__ == "__main__":
    print("Starting faculty data scraping...")  # Debug print
    faculty_data = scrape_tce_faculty()
    
    if faculty_data:
        print(f"\nFound {len(faculty_data)} faculty members:")
        print("-" * 50)
        for faculty in faculty_data:
            print(f"Name: {faculty['name']}")
            print(f"Designation: {faculty['designation']}")
            print(f"Email: {faculty['email']}")
            print(f"Image URL: {faculty['image_url']}")
            print(f"Profile URL: {faculty['profile_url']}")
            print("-" * 50)
            
        # Save to CSV
        save_to_csv(faculty_data)
    else:
        print("Failed to retrieve faculty data.")