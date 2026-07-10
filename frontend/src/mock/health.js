// ─────────────────────────────────────────────────────────────
// PetVerse Health Domain — Single Source of Truth Mock Dataset
// ─────────────────────────────────────────────────────────────

export const mockHealthRecords = [
  // ─── PET-1: Luna (Golden Retriever) ───────────────────────
  {
    id: "rec-1-1",
    petId: "pet-1",
    visitDate: "2026-06-15",
    veterinarian: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    healthScore: 94,
    weight: 28.5,
    height: 58,
    temperature: 38.4,
    heartRate: 92,
    respiratoryRate: 18,
    bodyCondition: 5,
    diagnosis: "Annual Physical Exam & Vaccination Booster",
    treatment: "Routine clinical assessment. Administered annual booster shots. Coat and joint health excellent.",
    prescriptions: [],
    vaccinations: [
      {
        name: "Leptospirosis",
        status: "Completed",
        dateAdministered: "2026-06-15",
        dateDue: "2027-06-15",
        reminderStatus: "Active",
        notes: "Annual booster dose. No adverse reactions observed."
      }
    ],
    medications: [],
    allergies: ["None known"],
    labResults: [
      { test: "CBC (Complete Blood Count)", result: "Normal", reference: "Within range", date: "2026-06-15" },
      { test: "Serum Chemistry Panel", result: "Normal", reference: "Within range", date: "2026-06-15" }
    ],
    attachments: [
      {
        id: "att-1-1",
        name: "Luna_Annual_Health_Certificate.pdf",
        category: "Certificate",
        uploadDate: "2026-06-15",
        doctor: "Dr. Sarah Wilson",
        url: "#"
      },
      {
        id: "att-1-2",
        name: "Luna_CBC_Lab_Report.pdf",
        category: "Lab Result",
        uploadDate: "2026-06-15",
        doctor: "Dr. Sarah Wilson",
        url: "#"
      }
    ],
    notes: "Luna is in excellent physiological shape. Coat is shiny, joints show no stiffness, and lungs/heart sound healthy. Owner advised to maintain current diet and exercise routine.",
    followUpDate: "2027-06-15"
  },
  {
    id: "rec-1-2",
    petId: "pet-1",
    visitDate: "2026-01-10",
    veterinarian: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    healthScore: 88,
    weight: 27.9,
    height: 58,
    temperature: 38.9,
    heartRate: 105,
    respiratoryRate: 22,
    bodyCondition: 5,
    diagnosis: "Otitis Externa (Mild Ear Infection)",
    treatment: "Thorough ear canal cleansing with medicated solution. Applied topical antibiotic drops. Ear cytology performed.",
    prescriptions: [
      {
        name: "Anotix Ear Drops",
        dosage: "3 drops per ear",
        frequency: "Twice daily",
        duration: "7 days"
      }
    ],
    vaccinations: [],
    medications: [
      {
        name: "Anotix Ear Drops",
        dosage: "3 drops per ear",
        frequency: "Twice daily",
        duration: "7 days",
        startDate: "2026-01-10",
        endDate: "2026-01-17",
        completed: true,
        missed: false
      }
    ],
    allergies: ["None known"],
    labResults: [
      { test: "Ear Cytology Swab", result: "Bacterial (Staphylococcus)", reference: "Negative", date: "2026-01-10" }
    ],
    attachments: [
      {
        id: "att-1-3",
        name: "Luna_Ear_Swab_Lab_Report.pdf",
        category: "Lab Result",
        uploadDate: "2026-01-10",
        doctor: "Dr. Sarah Wilson",
        url: "#"
      },
      {
        id: "att-1-4",
        name: "Luna_Prescription_Jan2026.pdf",
        category: "Prescription",
        uploadDate: "2026-01-10",
        doctor: "Dr. Sarah Wilson",
        url: "#"
      }
    ],
    notes: "Advised owner to avoid water entry into the ear canal during baths for 10 days. Schedule review if scratching persists beyond 1 week.",
    followUpDate: "2026-01-20"
  },
  {
    id: "rec-1-3",
    petId: "pet-1",
    visitDate: "2025-08-14",
    veterinarian: "Dr. Maria Chen",
    clinic: "CityPaws Animal Clinic",
    healthScore: 91,
    weight: 27.1,
    height: 57,
    temperature: 38.2,
    heartRate: 88,
    respiratoryRate: 16,
    bodyCondition: 5,
    diagnosis: "Routine Wellness Check — Healthy",
    treatment: "Full body examination. Teeth examined and found clean. Flea/tick prevention applied.",
    prescriptions: [],
    vaccinations: [
      {
        name: "Bordetella (Kennel Cough)",
        status: "Completed",
        dateAdministered: "2025-08-14",
        dateDue: "2026-08-14",
        reminderStatus: "Active",
        notes: "Intranasal vaccine administered"
      }
    ],
    medications: [
      {
        name: "NexGard Flea & Tick",
        dosage: "1 chew (extra-large)",
        frequency: "Monthly",
        duration: "3 months",
        startDate: "2025-08-14",
        endDate: "2025-11-14",
        completed: true,
        missed: false
      }
    ],
    allergies: ["None known"],
    labResults: [],
    attachments: [
      {
        id: "att-1-5",
        name: "Luna_Wellness_Aug2025.pdf",
        category: "Medical Report",
        uploadDate: "2025-08-14",
        doctor: "Dr. Maria Chen",
        url: "#"
      }
    ],
    notes: "Recommended transitioning to adult maintenance food as Luna approaches 2 years old. Joint supplements considered for large breed.",
    followUpDate: "2026-02-14"
  },

  // ─── PET-2: Milo (Persian Cat) ────────────────────────────
  {
    id: "rec-2-1",
    petId: "pet-2",
    visitDate: "2025-12-05",
    veterinarian: "Dr. John Carter",
    clinic: "Oakwood Veterinary Hospital",
    healthScore: 78,
    weight: 4.8,
    height: 28,
    temperature: 38.1,
    heartRate: 120,
    respiratoryRate: 24,
    bodyCondition: 4,
    diagnosis: "Feline Plaque Accumulation & Tear-Staining",
    treatment: "Ultrasonic scaling recommended at next appointment. Prescribed enzyme dental chews. Eye area cleaned with saline solution.",
    prescriptions: [],
    vaccinations: [],
    medications: [
      {
        name: "Virbac CET Dental Chews",
        dosage: "1 chew",
        frequency: "Daily",
        duration: "Ongoing",
        startDate: "2025-12-05",
        endDate: "",
        completed: false,
        missed: false
      }
    ],
    allergies: ["Chicken (dietary)", "Certain grain proteins"],
    labResults: [
      { test: "Dental Scoring Index", result: "Grade 2 Plaque", reference: "Grade 0-1 optimal", date: "2025-12-05" }
    ],
    attachments: [
      {
        id: "att-2-1",
        name: "Milo_Dental_Assessment.pdf",
        category: "Medical Report",
        uploadDate: "2025-12-05",
        doctor: "Dr. John Carter",
        url: "#"
      }
    ],
    notes: "Persian eyes present typical tear-staining due to facial anatomy. Clean daily with saline wipes. Schedule dental scaling within 3 months. Recommend grain-free wet food continuation.",
    followUpDate: "2026-06-05"
  },
  {
    id: "rec-2-2",
    petId: "pet-2",
    visitDate: "2025-06-18",
    veterinarian: "Dr. John Carter",
    clinic: "Oakwood Veterinary Hospital",
    healthScore: 82,
    weight: 4.5,
    height: 27,
    temperature: 38.5,
    heartRate: 130,
    respiratoryRate: 20,
    bodyCondition: 4,
    diagnosis: "Annual Kitten Vaccination Series",
    treatment: "FVRCP and FeLV immunizations completed. Microchip implanted. Full health baseline established.",
    prescriptions: [],
    vaccinations: [
      {
        name: "FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)",
        status: "Completed",
        dateAdministered: "2025-06-18",
        dateDue: "2026-06-18",
        reminderStatus: "Overdue",
        notes: "Core kitten vaccination"
      },
      {
        name: "Feline Leukemia (FeLV)",
        status: "Completed",
        dateAdministered: "2025-06-18",
        dateDue: "2026-06-18",
        reminderStatus: "Overdue",
        notes: "Lifestyle vaccine for outdoor/at-risk cats"
      }
    ],
    medications: [],
    allergies: ["Chicken (dietary)"],
    labResults: [],
    attachments: [
      {
        id: "att-2-2",
        name: "Milo_Vaccination_Certificate.pdf",
        category: "Certificate",
        uploadDate: "2025-06-18",
        doctor: "Dr. John Carter",
        url: "#"
      }
    ],
    notes: "Milo is healthy at 1 year old. Continue indoor environment. Annual booster vaccinations due June 2026. Recommend neutering consultation.",
    followUpDate: "2025-12-05"
  },

  // ─── PET-3: Rocky (German Shepherd) ──────────────────────
  {
    id: "rec-3-1",
    petId: "pet-3",
    visitDate: "2026-06-25",
    veterinarian: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    healthScore: 85,
    weight: 36.2,
    height: 64,
    temperature: 39.1,
    heartRate: 115,
    respiratoryRate: 26,
    bodyCondition: 5,
    diagnosis: "Paw Laceration & Soft Tissue Inflammation",
    treatment: "Cleaned minor glass cut on left front paw. Applied antiseptic Betadine dressing and waterproof bandage. Anti-inflammatory prescribed for 5 days.",
    prescriptions: [
      {
        name: "Meloxicam Oral Suspension",
        dosage: "1.5mg/kg",
        frequency: "Once daily with food",
        duration: "5 days"
      }
    ],
    vaccinations: [],
    medications: [
      {
        name: "Meloxicam Oral Suspension",
        dosage: "1.5mg/kg",
        frequency: "Once daily with food",
        duration: "5 days",
        startDate: "2026-06-25",
        endDate: "2026-06-30",
        completed: true,
        missed: false
      }
    ],
    allergies: ["Dairy products"],
    labResults: [],
    attachments: [
      {
        id: "att-3-1",
        name: "Rocky_Post_Treatment_Care_Instructions.pdf",
        category: "Medical Report",
        uploadDate: "2026-06-25",
        doctor: "Dr. Sarah Wilson",
        url: "#"
      }
    ],
    notes: "Keep bandage dry and prevent licking/biting — use collar if necessary. Restrict active outdoor play for 5 days. Return immediately if wound appears infected.",
    followUpDate: "2026-07-02"
  },
  {
    id: "rec-3-2",
    petId: "pet-3",
    visitDate: "2026-03-04",
    veterinarian: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    healthScore: 89,
    weight: 35.8,
    height: 64,
    temperature: 38.5,
    heartRate: 95,
    respiratoryRate: 18,
    bodyCondition: 5,
    diagnosis: "Periodontitis Grade 2 — Dental Surgery",
    treatment: "Comprehensive dental scaling, polishing, and extraction of upper left premolar (tooth 208). Sutures placed. Post-op antibiotics prescribed.",
    prescriptions: [
      {
        name: "Clindamycin Capsules",
        dosage: "150mg",
        frequency: "Twice daily",
        duration: "7 days"
      }
    ],
    vaccinations: [],
    medications: [
      {
        name: "Clindamycin Capsules",
        dosage: "150mg",
        frequency: "Twice daily",
        duration: "7 days",
        startDate: "2026-03-04",
        endDate: "2026-03-11",
        completed: true,
        missed: false
      }
    ],
    allergies: ["Dairy products"],
    labResults: [
      { test: "Dental Radiograph (Full Mouth)", result: "Grade 2 Periodontal Disease — Tooth 208 non-viable", reference: "Grade 0 optimal", date: "2026-03-04" },
      { test: "Pre-Anesthesia Blood Panel", result: "Normal", reference: "Within range", date: "2026-03-04" }
    ],
    attachments: [
      {
        id: "att-3-2",
        name: "Rocky_Dental_XRay_Report.pdf",
        category: "Lab Result",
        uploadDate: "2026-03-04",
        doctor: "Dr. Sarah Wilson",
        url: "#"
      },
      {
        id: "att-3-3",
        name: "Rocky_Dental_Surgery_Discharge.pdf",
        category: "Discharge Summary",
        uploadDate: "2026-03-04",
        doctor: "Dr. Sarah Wilson",
        url: "#"
      }
    ],
    notes: "Soft diet for 5-7 days. Re-check suture line in one week. Begin routine dental care: dental chews or brushing 3x per week going forward.",
    followUpDate: "2026-03-11"
  },
  {
    id: "rec-3-3",
    petId: "pet-3",
    visitDate: "2025-11-15",
    veterinarian: "Dr. James Park",
    clinic: "Oakwood Veterinary Hospital",
    healthScore: 92,
    weight: 35.5,
    height: 63,
    temperature: 38.3,
    heartRate: 88,
    respiratoryRate: 16,
    bodyCondition: 5,
    diagnosis: "Annual Vaccination & Parasite Prevention",
    treatment: "DHPP booster administered. Rabies titer checked — satisfactory levels confirmed. Heartworm test: Negative.",
    prescriptions: [],
    vaccinations: [
      {
        name: "DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)",
        status: "Completed",
        dateAdministered: "2025-11-15",
        dateDue: "2026-11-15",
        reminderStatus: "Active",
        notes: "Annual core vaccine booster"
      }
    ],
    medications: [
      {
        name: "Heartgard Plus (Heartworm Prevention)",
        dosage: "1 chew (large)",
        frequency: "Monthly",
        duration: "12 months",
        startDate: "2025-11-15",
        endDate: "2026-11-15",
        completed: false,
        missed: false
      }
    ],
    allergies: ["Dairy products"],
    labResults: [
      { test: "Heartworm Antigen Test", result: "Negative", reference: "Negative", date: "2025-11-15" },
      { test: "Fecal Parasite Screen", result: "Negative", reference: "Negative", date: "2025-11-15" }
    ],
    attachments: [
      {
        id: "att-3-4",
        name: "Rocky_Annual_Wellness_Nov2025.pdf",
        category: "Medical Report",
        uploadDate: "2025-11-15",
        doctor: "Dr. James Park",
        url: "#"
      },
      {
        id: "att-3-5",
        name: "Rocky_Rabies_Certificate_2025.pdf",
        category: "Certificate",
        uploadDate: "2025-11-15",
        doctor: "Dr. James Park",
        url: "#"
      }
    ],
    notes: "Rocky is in excellent condition for a 4-year-old shepherd. Continue current raw diet supplemented with Omega-3. Hip scoring recommended at 5 years.",
    followUpDate: "2026-11-15"
  }
];

// ─────────────────────────────────────────────────────────────
// APPOINTMENTS
// ─────────────────────────────────────────────────────────────
export const mockAppointments = [
  {
    id: "apt-1",
    petId: "pet-1",
    visitDate: "2026-07-12",
    time: "10:30 AM",
    reason: "Annual Vaccinations & Full Body Checkup",
    status: "Upcoming",
    veterinarian: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    address: "742 Evergreen Terrace, Medical District",
    phone: "+1 (555) 011-3030",
    notes: "Fast 8 hours prior if comprehensive bloodwork is ordered. Bring previous vaccination certificates.",
    reminderSent: true
  },
  {
    id: "apt-2",
    petId: "pet-2",
    visitDate: "2026-07-18",
    time: "04:00 PM",
    reason: "FVRCP & FeLV Overdue Booster Immunizations",
    status: "Upcoming",
    veterinarian: "Dr. John Carter",
    clinic: "Oakwood Veterinary Hospital",
    address: "742 Evergreen Terrace, Medical District",
    phone: "+1 (555) 011-3030",
    notes: "Milo is easily stressed in carriers. Administer Feliway calming spray 30 minutes before travel. Dental scaling may also be performed.",
    reminderSent: true
  },
  {
    id: "apt-3",
    petId: "pet-3",
    visitDate: "2026-07-02",
    time: "09:00 AM",
    reason: "Paw Wound Follow-Up Assessment",
    status: "Upcoming",
    veterinarian: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    address: "742 Evergreen Terrace, Medical District",
    phone: "+1 (555) 011-3030",
    notes: "Suture and wound healing review after paw laceration treatment. Remove bandage 1 hour before the appointment.",
    reminderSent: false
  },
  {
    id: "apt-4",
    petId: "pet-1",
    visitDate: "2026-03-10",
    time: "02:00 PM",
    reason: "Dermatology Consultation — Seasonal Shedding",
    status: "Completed",
    veterinarian: "Dr. Maria Chen",
    clinic: "CityPaws Animal Clinic",
    address: "128 Riverstone Ave, Downtown",
    phone: "+1 (555) 022-9090",
    notes: "No follow-up required. Shedding normalized with Omega-3 supplementation.",
    reminderSent: true
  },
  {
    id: "apt-5",
    petId: "pet-3",
    visitDate: "2026-03-11",
    time: "11:00 AM",
    reason: "Post-Dental Surgery Suture Check",
    status: "Completed",
    veterinarian: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    address: "742 Evergreen Terrace, Medical District",
    phone: "+1 (555) 011-3030",
    notes: "Sutures healing well. Soft diet discontinued. Full recovery confirmed.",
    reminderSent: true
  },
  {
    id: "apt-6",
    petId: "pet-2",
    visitDate: "2026-05-10",
    time: "03:30 PM",
    reason: "Dental Scaling Pre-Assessment",
    status: "Cancelled",
    veterinarian: "Dr. John Carter",
    clinic: "Oakwood Veterinary Hospital",
    address: "742 Evergreen Terrace, Medical District",
    phone: "+1 (555) 011-3030",
    notes: "Cancelled by owner due to scheduling conflict. Rebooked for July 18.",
    reminderSent: false
  }
];

// ─────────────────────────────────────────────────────────────
// EMERGENCY CONTACTS
// ─────────────────────────────────────────────────────────────
export const mockEmergencyContacts = [
  {
    id: "contact-1",
    name: "Oakwood Veterinary Emergency Hospital",
    phone: "+1 (555) 911-3030",
    availability: "Open 24/7",
    role: "Primary Emergency Clinic",
    address: "742 Evergreen Terrace, Medical District"
  },
  {
    id: "contact-2",
    name: "ASPCA Poison Control Helpline",
    phone: "+1 (888) 426-4435",
    availability: "Open 24/7",
    role: "Toxic Substance Support",
    address: "National hotline (Consultation fees may apply)"
  },
  {
    id: "contact-3",
    name: "Dr. Sarah Wilson (Emergency Mobile)",
    phone: "+1 (555) 019-2831",
    availability: "Mon–Fri 8:00 AM – 6:00 PM",
    role: "Primary Veterinarian",
    address: "Direct mobile line for emergency advice"
  }
];

// ─────────────────────────────────────────────────────────────
// MEDICAL DOCUMENTS (standalone, for the Documents page)
// ─────────────────────────────────────────────────────────────
export const mockMedicalDocuments = [
  {
    id: "doc-med-1",
    petId: "pet-1",
    name: "Luna_Annual_Health_Certificate_2026.pdf",
    category: "Certificate",
    uploadDate: "2026-06-15",
    doctor: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "124 KB",
    url: "#",
    description: "Official annual health clearance certificate. Valid until June 2027."
  },
  {
    id: "doc-med-2",
    petId: "pet-1",
    name: "Luna_CBC_Blood_Panel_June2026.pdf",
    category: "Lab Result",
    uploadDate: "2026-06-15",
    doctor: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "88 KB",
    url: "#",
    description: "Complete blood count and chemistry panel — all values within normal limits."
  },
  {
    id: "doc-med-3",
    petId: "pet-1",
    name: "Luna_Prescription_Anotix_Jan2026.pdf",
    category: "Prescription",
    uploadDate: "2026-01-10",
    doctor: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "45 KB",
    url: "#",
    description: "Prescription for Anotix ear drops — 7-day course."
  },
  {
    id: "doc-med-4",
    petId: "pet-1",
    name: "Luna_Wellness_Report_Aug2025.pdf",
    category: "Medical Report",
    uploadDate: "2025-08-14",
    doctor: "Dr. Maria Chen",
    clinic: "CityPaws Animal Clinic",
    fileSize: "212 KB",
    url: "#",
    description: "Wellness examination report from August 2025. Flea prevention applied."
  },
  {
    id: "doc-med-5",
    petId: "pet-2",
    name: "Milo_Vaccination_Certificate_2025.pdf",
    category: "Certificate",
    uploadDate: "2025-06-18",
    doctor: "Dr. John Carter",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "67 KB",
    url: "#",
    description: "FVRCP and FeLV vaccination certificate. Boosters due June 2026."
  },
  {
    id: "doc-med-6",
    petId: "pet-2",
    name: "Milo_Dental_Assessment_Dec2025.pdf",
    category: "Medical Report",
    uploadDate: "2025-12-05",
    doctor: "Dr. John Carter",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "95 KB",
    url: "#",
    description: "Dental scaling assessment. Grade 2 plaque noted. Scaling recommended."
  },
  {
    id: "doc-med-7",
    petId: "pet-3",
    name: "Rocky_Dental_Surgery_Discharge_Mar2026.pdf",
    category: "Discharge Summary",
    uploadDate: "2026-03-04",
    doctor: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "178 KB",
    url: "#",
    description: "Post-dental surgery discharge instructions. Tooth 208 extraction completed successfully."
  },
  {
    id: "doc-med-8",
    petId: "pet-3",
    name: "Rocky_Dental_XRay_Radiograph.pdf",
    category: "Lab Result",
    uploadDate: "2026-03-04",
    doctor: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "542 KB",
    url: "#",
    description: "Full-mouth dental radiograph confirming Grade 2 periodontal disease and non-viable premolar."
  },
  {
    id: "doc-med-9",
    petId: "pet-3",
    name: "Rocky_Annual_Wellness_Nov2025.pdf",
    category: "Medical Report",
    uploadDate: "2025-11-15",
    doctor: "Dr. James Park",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "156 KB",
    url: "#",
    description: "Annual wellness report. Heartworm negative. DHPP booster administered."
  },
  {
    id: "doc-med-10",
    petId: "pet-3",
    name: "Rocky_Rabies_Vaccination_Certificate.pdf",
    category: "Certificate",
    uploadDate: "2025-11-15",
    doctor: "Dr. James Park",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "52 KB",
    url: "#",
    description: "Rabies vaccination certificate issued November 2025."
  },
  {
    id: "doc-med-11",
    petId: "pet-3",
    name: "Rocky_Paw_Post_Treatment_Instructions.pdf",
    category: "Medical Report",
    uploadDate: "2026-06-25",
    doctor: "Dr. Sarah Wilson",
    clinic: "Oakwood Veterinary Hospital",
    fileSize: "38 KB",
    url: "#",
    description: "Post-treatment care instructions following paw laceration dressing."
  }
];

// ─────────────────────────────────────────────────────────────
// STORAGE HELPERS — Health Records
// ─────────────────────────────────────────────────────────────
export function getStoredHealthRecords() {
  if (typeof window === "undefined") return mockHealthRecords;
  const data = localStorage.getItem("petverse_health_records");
  if (!data) {
    localStorage.setItem("petverse_health_records", JSON.stringify(mockHealthRecords));
    return mockHealthRecords;
  }
  return JSON.parse(data);
}

export function saveStoredHealthRecords(records) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_health_records", JSON.stringify(records));
  }
}

// ─────────────────────────────────────────────────────────────
// STORAGE HELPERS — Appointments
// ─────────────────────────────────────────────────────────────
export function getStoredAppointments() {
  if (typeof window === "undefined") return mockAppointments;
  const data = localStorage.getItem("petverse_appointments");
  if (!data) {
    localStorage.setItem("petverse_appointments", JSON.stringify(mockAppointments));
    return mockAppointments;
  }
  return JSON.parse(data);
}

export function saveStoredAppointments(appointments) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_appointments", JSON.stringify(appointments));
  }
}

// ─────────────────────────────────────────────────────────────
// STORAGE HELPERS — Emergency Contacts
// ─────────────────────────────────────────────────────────────
export function getStoredEmergencyContacts() {
  if (typeof window === "undefined") return mockEmergencyContacts;
  const data = localStorage.getItem("petverse_emergency_contacts");
  if (!data) {
    localStorage.setItem("petverse_emergency_contacts", JSON.stringify(mockEmergencyContacts));
    return mockEmergencyContacts;
  }
  return JSON.parse(data);
}

export function saveStoredEmergencyContacts(contacts) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_emergency_contacts", JSON.stringify(contacts));
  }
}

// ─────────────────────────────────────────────────────────────
// STORAGE HELPERS — Medical Documents
// ─────────────────────────────────────────────────────────────
export function getStoredMedicalDocuments() {
  if (typeof window === "undefined") return mockMedicalDocuments;
  const data = localStorage.getItem("petverse_medical_documents");
  if (!data) {
    localStorage.setItem("petverse_medical_documents", JSON.stringify(mockMedicalDocuments));
    return mockMedicalDocuments;
  }
  return JSON.parse(data);
}

export function saveStoredMedicalDocuments(docs) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_medical_documents", JSON.stringify(docs));
  }
}
