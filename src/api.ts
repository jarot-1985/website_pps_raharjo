import { 
  AppSettings, News, Facility, Gallery, Achievement, 
  Announcement, DocumentDownload, BudgetReport, FAQItem, 
  Staff, BeneficiaryRegistration, ContactMessage, Testimonial 
} from "./types";

const BASE_URL = ""; // Relative paths will hit Express

export async function fetchSettings(): Promise<AppSettings> {
  const res = await fetch(`${BASE_URL}/api/settings`);
  return res.json();
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  const res = await fetch(`${BASE_URL}/api/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  const data = await res.json();
  return data.settings;
}

// Generic CRUD factories
async function fetchItems<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(`${BASE_URL}/api/${endpoint}`);
  return res.json();
}

async function createItem<T>(endpoint: string, item: Partial<T>): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const json = await res.json();
  return json.data;
}

async function updateItem<T>(endpoint: string, id: string, item: Partial<T>): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const json = await res.json();
  return json.data;
}

async function deleteItem(endpoint: string, id: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/api/${endpoint}/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  return json.success;
}

// Concrete fetchers
export const getNews = () => fetchItems<News>("news");
export const createNews = (item: Partial<News>) => createItem<News>("news", item);
export const updateNews = (id: string, item: Partial<News>) => updateItem<News>("news", id, item);
export const deleteNews = (id: string) => deleteItem("news", id);

export const getFacilities = () => fetchItems<Facility>("facilities");
export const createFacility = (item: Partial<Facility>) => createItem<Facility>("facilities", item);
export const updateFacility = (id: string, item: Partial<Facility>) => updateItem<Facility>("facilities", id, item);
export const deleteFacility = (id: string) => deleteItem("facilities", id);

export const getGalleries = () => fetchItems<Gallery>("galleries");
export const createGallery = (item: Partial<Gallery>) => createItem<Gallery>("galleries", item);
export const updateGallery = (id: string, item: Partial<Gallery>) => updateItem<Gallery>("galleries", id, item);
export const deleteGallery = (id: string) => deleteItem("galleries", id);

export const getAchievements = () => fetchItems<Achievement>("achievements");
export const createAchievement = (item: Partial<Achievement>) => createItem<Achievement>("achievements", item);
export const updateAchievement = (id: string, item: Partial<Achievement>) => updateItem<Achievement>("achievements", id, item);
export const deleteAchievement = (id: string) => deleteItem("achievements", id);

export const getAnnouncements = () => fetchItems<Announcement>("announcements");
export const createAnnouncement = (item: Partial<Announcement>) => createItem<Announcement>("announcements", item);
export const updateAnnouncement = (id: string, item: Partial<Announcement>) => updateItem<Announcement>("announcements", id, item);
export const deleteAnnouncement = (id: string) => deleteItem("announcements", id);

export const getDocuments = () => fetchItems<DocumentDownload>("documents");
export const createDocument = (item: Partial<DocumentDownload>) => createItem<DocumentDownload>("documents", item);
export const updateDocument = (id: string, item: Partial<DocumentDownload>) => updateItem<DocumentDownload>("documents", id, item);
export const deleteDocument = (id: string) => deleteItem("documents", id);

export const getBudgets = () => fetchItems<BudgetReport>("budgets");
export const createBudget = (item: Partial<BudgetReport>) => createItem<BudgetReport>("budgets", item);
export const updateBudget = (id: string, item: Partial<BudgetReport>) => updateItem<BudgetReport>("budgets", id, item);
export const deleteBudget = (id: string) => deleteItem("budgets", id);

export const getFaqs = () => fetchItems<FAQItem>("faqs");
export const createFaq = (item: Partial<FAQItem>) => createItem<FAQItem>("faqs", item);
export const updateFaq = (id: string, item: Partial<FAQItem>) => updateItem<FAQItem>("faqs", id, item);
export const deleteFaq = (id: string) => deleteItem("faqs", id);

export const getStaff = () => fetchItems<Staff>("staff");
export const createStaff = (item: Partial<Staff>) => createItem<Staff>("staff", item);
export const updateStaff = (id: string, item: Partial<Staff>) => updateItem<Staff>("staff", id, item);
export const deleteStaff = (id: string) => deleteItem("staff", id);

export const getRegistrations = () => fetchItems<BeneficiaryRegistration>("registrations");
export const createRegistration = (item: Partial<BeneficiaryRegistration>) => createItem<BeneficiaryRegistration>("registrations", item);
export const updateRegistration = (id: string, item: Partial<BeneficiaryRegistration>) => updateItem<BeneficiaryRegistration>("registrations", id, item);
export const deleteRegistration = (id: string) => deleteItem("registrations", id);

export const getContactMessages = () => fetchItems<ContactMessage>("contact");
export const createContactMessage = (item: Partial<ContactMessage>) => createItem<ContactMessage>("contact", item);
export const deleteContactMessage = (id: string) => deleteItem("contact", id);

export const getTestimonials = () => fetchItems<Testimonial>("testimonials");
export const createTestimonial = (item: Partial<Testimonial>) => createItem<Testimonial>("testimonials", item);
export const updateTestimonial = (id: string, item: Partial<Testimonial>) => updateItem<Testimonial>("testimonials", id, item);
export const deleteTestimonial = (id: string) => deleteItem("testimonials", id);

// File Upload Utility
export async function uploadFile(base64Content: string, fileName: string, fileType: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file: base64Content, name: fileName, type: fileType }),
  });
  const data = await res.json();
  if (data.success) {
    return data.url;
  }
  throw new Error("Upload failed");
}

// Convert File to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
