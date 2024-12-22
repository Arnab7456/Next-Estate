export interface AboutProps {
    id: number;
    title: string;
    points?: { id: number; description: string }[]; // Add `points` as an optional property
  }
  
  export const AboutData: AboutProps[] = [
    {
      id: 1,
      title:
        "Nest-Scout is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.",
      points: [
        { id: 1, description: "Specializing in desirable neighborhoods." },
        { id: 2, description: "Experienced agents providing exceptional service." },
      ],
    },
    {
      id: 2,
      title:
        "Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.",
      points: [
        { id: 1, description: "Expert advice tailored to client goals." },
        { id: 2, description: "Personalized service for every transaction." },
      ],
    },
    {
      id: 3,
      title:
        "Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.",
      points: [
        { id: 1, description: "Dedicated to making buying and selling rewarding." },
        { id: 2, description: "Experienced agents with deep industry knowledge." },
      ],
    },
  ];
  