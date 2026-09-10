export const galleryCategories = ["All", "Living Room", "Bedroom", "Modular Kitchen", "Wardrobes", "TV Units", "Dining", "Bathroom", "Complete Home"] as const;
export type GalleryCategory = typeof galleryCategories[number];
export type GalleryMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  category: Exclude<GalleryCategory, "All" | "Complete Home">;
  alt: string;
  width?: number;
  height?: number;
  responsive?: boolean;
};
export type GalleryProject = { id: string; title: string; location: string; concept: boolean; media: GalleryMedia[] };
// Replace these clearly labelled design concepts with your own completed-project photos.
// For video append { type: "video", src: "/videos/projects/project-01/walkthrough.mp4",
// poster: "/images/projects/project-01/living-room-01.webp", title: "Home walkthrough",
// category: "Living Room", alt: "Walkthrough of the home" } to a project's media array.
export const galleryData: GalleryProject[] = [
  {
    "id": "project-01",
    "title": "Modern 3 BHK Residence",
    "location": "Ranip, Ahmedabad",
    "concept": true,
    "media": [
      {
        "type": "image",
        "src": "/images/projects/project-01/living-room-01.webp",
        "title": "Living Room design",
        "category": "Living Room",
        "alt": "Living Room \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-01/bedroom-01.webp",
        "title": "Bedroom design",
        "category": "Bedroom",
        "alt": "Bedroom \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-01/modular-kitchen-01.webp",
        "title": "Modular Kitchen design",
        "category": "Modular Kitchen",
        "alt": "Modular Kitchen \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-01/wardrobes-01.webp",
        "title": "Wardrobes design",
        "category": "Wardrobes",
        "alt": "Wardrobes \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-01/tv-units-01.webp",
        "title": "TV Units design",
        "category": "TV Units",
        "alt": "TV Units \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-01/dining-01.webp",
        "title": "Dining design",
        "category": "Dining",
        "alt": "Dining \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-01/bathroom-01.webp",
        "title": "Bathroom design",
        "category": "Bathroom",
        "alt": "Bathroom \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      }
    ]
  },
  {
    "id": "project-02",
    "title": "Contemporary 2 BHK Interior",
    "location": "Ahmedabad",
    "concept": true,
    "media": [
      {
        "type": "image",
        "src": "/images/projects/project-02/living-room-01.webp",
        "title": "Living Room design",
        "category": "Living Room",
        "alt": "Living Room \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-02/bedroom-01.webp",
        "title": "Bedroom design",
        "category": "Bedroom",
        "alt": "Bedroom \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-02/modular-kitchen-01.webp",
        "title": "Modular Kitchen design",
        "category": "Modular Kitchen",
        "alt": "Modular Kitchen \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-02/wardrobes-01.webp",
        "title": "Wardrobes design",
        "category": "Wardrobes",
        "alt": "Wardrobes \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-02/tv-units-01.webp",
        "title": "TV Units design",
        "category": "TV Units",
        "alt": "TV Units \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-02/dining-01.webp",
        "title": "Dining design",
        "category": "Dining",
        "alt": "Dining \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      },
      {
        "type": "image",
        "src": "/images/projects/project-02/bathroom-01.webp",
        "title": "Bathroom design",
        "category": "Bathroom",
        "alt": "Bathroom \u2014 illustrative Ahmedabad home interior",
        "width": 1672,
        "height": 941,
        "responsive": true
      }
    ]
  }
];
