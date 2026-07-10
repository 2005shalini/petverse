// Mock data for Phase 11: Community & Adoption

export const mockStories = [
  {
    id: "story-1",
    authorName: "Luna & Shreyash",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80",
    mediaType: "image",
    petName: "Luna",
    petBreed: "Golden Retriever"
  },
  {
    id: "story-2",
    authorName: "Sarah Connor",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&auto=format&fit=crop&q=80",
    mediaType: "image",
    petName: "Milo",
    petBreed: "Persian Cat"
  },
  {
    id: "story-3",
    authorName: "Marcus Vance",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80",
    mediaType: "image",
    petName: "Rocky",
    petBreed: "German Shepherd"
  },
  {
    id: "story-4",
    authorName: "Emma Watson",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80",
    mediaType: "image",
    petName: "Bella",
    petBreed: "Beagle"
  },
  {
    id: "story-5",
    authorName: "Liam Neeson",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80",
    mediaType: "image",
    petName: "Coco",
    petBreed: "Tabby Cat"
  }
];

export const mockPosts = [
  {
    id: "post-1",
    author: {
      id: "usr-1",
      name: "Shreyash Sharma",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Pet Parent"
    },
    pet: {
      id: "pet-1",
      name: "Luna",
      breed: "Golden Retriever",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&auto=format&fit=crop&q=80"
    },
    content: "Luna completed her annual health checkup today! The vet says she is in perfect shape. Remember to keep your fur babies' rabies vaccinations up to date, guys! 🩺🐾 #VetVisit #GoldenRetriever #HappyHealthy",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=80"
    ],
    videos: [],
    location: "Greenwood Veterinary Clinic",
    likes: ["usr-2", "usr-3", "usr-4"],
    comments: [
      {
        id: "c-1-1",
        author: {
          name: "Dr. Sarah Wilson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
        },
        content: "She was such a good girl during the exam! Keep up the excellent care, Shreyash.",
        createdAt: "2026-07-10T12:00:00Z"
      },
      {
        id: "c-1-2",
        author: {
          name: "Emily Watson",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80"
        },
        content: "So sweet! Those eyes melt my heart. 😍",
        createdAt: "2026-07-10T14:30:00Z"
      }
    ],
    shares: 12,
    bookmarks: ["usr-1"],
    createdAt: "2026-07-10T10:15:00Z"
  },
  {
    id: "post-2",
    author: {
      id: "usr-2",
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Dog Trainer"
    },
    pet: {
      id: "pet-3",
      name: "Rocky",
      breed: "German Shepherd",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&auto=format&fit=crop&q=80"
    },
    content: "Training tip of the day: When teaching your German Shepherd loose-leash walking, use high-value treats and change direction frequently to keep their attention focused on you. Consistency is key! 🐕🦺 #DogTraining #GermanShepherd #ProTips",
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&auto=format&fit=crop&q=80"
    ],
    videos: [],
    location: "Prospect Park Dog Run",
    likes: ["usr-1", "usr-3"],
    comments: [
      {
        id: "c-2-1",
        author: {
          name: "Shreyash Sharma",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
        },
        content: "Thanks for this! Luna keeps pulling when she sees squirrels. Will try changing directions tomorrow.",
        createdAt: "2026-07-09T18:00:00Z"
      }
    ],
    shares: 45,
    bookmarks: ["usr-1", "usr-3"],
    createdAt: "2026-07-09T16:45:00Z"
  },
  {
    id: "post-3",
    author: {
      id: "usr-3",
      name: "Sarah Connor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      role: "Cat Enthusiast"
    },
    pet: {
      id: "pet-2",
      name: "Milo",
      breed: "Persian Cat",
      image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=150&auto=format&fit=crop&q=80"
    },
    content: "Caught Milo trying to squeeze himself into this tiny Amazon delivery box. If it fits, I sits! 📦🐈 #CatLife #PersianCat #FunnyCats",
    images: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80"
    ],
    videos: [],
    location: "Living Room",
    likes: ["usr-1", "usr-2", "usr-4", "usr-5"],
    comments: [],
    shares: 8,
    bookmarks: [],
    createdAt: "2026-07-08T09:20:00Z"
  }
];

export const mockAdoptablePets = [
  {
    id: "adopt-1",
    petName: "Max",
    breed: "Border Collie Mix",
    age: "2 years",
    gender: "Male",
    size: "Medium (18 kg)",
    health: "Excellent, Neutered",
    vaccinations: "Fully vaccinated up to date",
    location: "Brooklyn, NY",
    shelterId: "shelter-1",
    shelterName: "Hopeful Paws Sanctuary",
    description: "Max is an incredibly intelligent, high-energy boy who loves to fetch and perform tricks. He is looking for an active family who can give him the mental stimulation and exercise he thrives on. He is great with other dogs, but has not been tested with cats.",
    gallery: [
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop&q=80"
    ],
    status: "Available",
    ownerContact: "adopt@hopefulpaws.org"
  },
  {
    id: "adopt-2",
    petName: "Chloe",
    breed: "Ragdoll",
    age: "1 year",
    gender: "Female",
    size: "Small (4 kg)",
    health: "Healthy, Spayed, Microchipped",
    vaccinations: "FVRCP & Rabies current",
    location: "Manhattan, NY",
    shelterId: "shelter-2",
    shelterName: "Metro Cat Haven",
    description: "Chloe is a sweet, gentle lap cat who loves chin scratches and soft beds. True to her ragdoll breed, she becomes completely relaxed when held. She would do best in a calm, quiet household.",
    gallery: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&auto=format&fit=crop&q=80"
    ],
    status: "Available",
    ownerContact: "chloe-info@metrocat.org"
  },
  {
    id: "adopt-3",
    petName: "Rocky Jr.",
    breed: "Siberian Husky",
    age: "8 months",
    gender: "Male",
    size: "Large (24 kg)",
    health: "Active, Underwent minor dewclaw treatment",
    vaccinations: "Core puppy series complete",
    location: "Queens, NY",
    shelterId: "shelter-1",
    shelterName: "Hopeful Paws Sanctuary",
    description: "Rocky Jr. is a gorgeous blue-eyed husky pup with a dramatic personality. He loves to 'talk' and sing. He needs a secure yard and an owner familiar with working breeds.",
    gallery: [
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=800&auto=format&fit=crop&q=80"
    ],
    status: "Pending",
    ownerContact: "adopt@hopefulpaws.org"
  }
];

export const mockShelters = [
  {
    id: "shelter-1",
    name: "Hopeful Paws Sanctuary",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    location: "788 Flatbush Ave, Brooklyn, NY 11226",
    rating: 4.9,
    reviewsCount: 142,
    phone: "(718) 555-0199",
    email: "info@hopefulpaws.org",
    volunteerInfo: "We are always looking for dog walkers, kennel cleaners, and event hosts! Applications are processed weekly.",
    volunteerOpportunities: [
      { id: "op-1", title: "Morning Dog Walker", timing: "Daily 8 AM - 10 AM" },
      { id: "op-2", title: "Social Media Advocate", timing: "Flexible Remote" }
    ]
  },
  {
    id: "shelter-2",
    name: "Metro Cat Haven",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80",
    location: "420 W 34th St, New York, NY 10001",
    rating: 4.8,
    reviewsCount: 96,
    phone: "(212) 555-0144",
    email: "volunteer@metrocat.org",
    volunteerInfo: "Cat socializers needed! Help our rescue cats adjust to human interaction to prepare them for their new homes.",
    volunteerOpportunities: [
      { id: "op-3", title: "Cat Room Socializer", timing: "Weekends 12 PM - 4 PM" }
    ]
  }
];

export const mockLostPets = [
  {
    id: "lost-1",
    petName: "Buddy",
    species: "Dog",
    breed: "Corgi",
    color: "Red & White",
    reward: "$500",
    lastSeenDate: "2026-07-09",
    lastSeenTime: "04:30 PM",
    location: "Central Park West (near 79th St), Manhattan",
    contact: "(555) 012-3456",
    photo: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=600&auto=format&fit=crop&q=80",
    status: "Lost",
    description: "Buddy is wearing a blue collar with a red tag. He is microchipped. He is friendly but might be frightened and skittish. Please call immediately if spotted."
  },
  {
    id: "lost-2",
    petName: "Luna (Tabby)",
    species: "Cat",
    breed: "Domestic Shorthair",
    color: "Brown Tabby",
    reward: "Reward Offered",
    lastSeenDate: "2026-07-08",
    lastSeenTime: "11:00 AM",
    location: "Astoria Park, Queens",
    contact: "(555) 987-6543",
    photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80",
    status: "Lost",
    description: "Luna snuck out of our ground floor window. She has a green collar with bell. She has brown tabby stripes and white socks on front paws."
  },
  {
    id: "lost-3",
    petName: "Biscuit",
    species: "Dog",
    breed: "Pomeranian",
    color: "Cream",
    reward: "Found!",
    lastSeenDate: "2026-07-10",
    lastSeenTime: "08:00 AM",
    location: "Hoboken Waterfront, NJ",
    contact: "(555) 444-1234",
    photo: "https://images.unsplash.com/photo-1529429617329-84d1004b5747?w=600&auto=format&fit=crop&q=80",
    status: "Found",
    description: "Found bud wandering near the pier. Safe and warm now. Contact to verify ownership."
  }
];

export const mockConversations = [
  {
    id: "conv-1",
    participant: {
      name: "Hopeful Paws Sanctuary",
      avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&auto=format&fit=crop&q=80",
      status: "online",
      role: "Verified Shelter"
    },
    messages: [
      { id: "m1", sender: "them", text: "Hello Shreyash! We received your inquiry about Max. He is still available for adoption.", timestamp: "2026-07-09T09:00:00Z", status: "read" },
      { id: "m2", sender: "me", text: "Hi! That's wonderful news. I have a Golden Retriever named Luna. Do you think Max would get along with her?", timestamp: "2026-07-09T09:15:00Z", status: "read" },
      { id: "m3", sender: "them", text: "Absolutely! Max is very socialized and has completed several positive playgroups with retrievers here. We would love to set up a meet-and-greet.", timestamp: "2026-07-09T09:30:00Z", status: "read" }
    ]
  },
  {
    id: "conv-2",
    participant: {
      name: "Dr. Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      status: "offline",
      role: "Veterinarian"
    },
    messages: [
      { id: "m4", sender: "me", text: "Dr. Wilson, Luna's ears look a bit red today. Should I apply the drops from last summer?", timestamp: "2026-07-08T14:00:00Z", status: "read" },
      { id: "m5", sender: "them", text: "Hi Shreyash. Please don't reuse old drops without an exam, as there might be a different underlying cause. I've scheduled a quick consult for Friday morning.", timestamp: "2026-07-08T15:30:00Z", status: "read" }
    ]
  }
];

// Helper functions with localStorage synchronization

export function getStoredPosts() {
  if (typeof window === "undefined") return mockPosts;
  const data = localStorage.getItem("petverse_community_posts");
  if (!data) {
    localStorage.setItem("petverse_community_posts", JSON.stringify(mockPosts));
    return mockPosts;
  }
  return JSON.parse(data);
}

export function saveStoredPosts(posts) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_community_posts", JSON.stringify(posts));
  }
}

export function getStoredStories() {
  if (typeof window === "undefined") return mockStories;
  const data = localStorage.getItem("petverse_stories");
  if (!data) {
    localStorage.setItem("petverse_stories", JSON.stringify(mockStories));
    return mockStories;
  }
  return JSON.parse(data);
}

export function saveStoredStories(stories) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_stories", JSON.stringify(stories));
  }
}

export function getStoredAdoptablePets() {
  if (typeof window === "undefined") return mockAdoptablePets;
  const data = localStorage.getItem("petverse_adoptable_pets");
  if (!data) {
    localStorage.setItem("petverse_adoptable_pets", JSON.stringify(mockAdoptablePets));
    return mockAdoptablePets;
  }
  return JSON.parse(data);
}

export function saveStoredAdoptablePets(pets) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_adoptable_pets", JSON.stringify(pets));
  }
}

export function getStoredShelters() {
  if (typeof window === "undefined") return mockShelters;
  const data = localStorage.getItem("petverse_shelters");
  if (!data) {
    localStorage.setItem("petverse_shelters", JSON.stringify(mockShelters));
    return mockShelters;
  }
  return JSON.parse(data);
}

export function saveStoredShelters(shelters) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_shelters", JSON.stringify(shelters));
  }
}

export function getStoredLostPets() {
  if (typeof window === "undefined") return mockLostPets;
  const data = localStorage.getItem("petverse_lost_pets");
  if (!data) {
    localStorage.setItem("petverse_lost_pets", JSON.stringify(mockLostPets));
    return mockLostPets;
  }
  return JSON.parse(data);
}

export function saveStoredLostPets(pets) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_lost_pets", JSON.stringify(pets));
  }
}

export function getStoredConversations() {
  if (typeof window === "undefined") return mockConversations;
  const data = localStorage.getItem("petverse_conversations");
  if (!data) {
    localStorage.setItem("petverse_conversations", JSON.stringify(mockConversations));
    return mockConversations;
  }
  return JSON.parse(data);
}

export function saveStoredConversations(conversations) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_conversations", JSON.stringify(conversations));
  }
}
