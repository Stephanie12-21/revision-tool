import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dubois",
    title: "Directrice Marketing",
    company: "TechCorp",
    content:
      "Ce service a complètement transformé notre approche marketing. Les résultats ont dépassé nos attentes et l'équipe est exceptionnelle.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "Jean Martin",
    title: "CEO",
    company: "StartupPro",
    content:
      "Une expérience remarquable du début à la fin. L'attention aux détails et la qualité du service sont incomparables.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Sophie Chen",
    title: "Product Manager",
    company: "InnovaTech",
    content:
      "Grâce à cette solution, nous avons pu optimiser nos processus et améliorer significativement notre productivité.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: 4,
    name: "Lucas Bernard",
    title: "Développeur Senior",
    company: "CodeFactory",
    content:
      "L'interface intuitive et les fonctionnalités avancées font de cet outil un incontournable pour notre équipe.",
    rating: 4,
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: 5,
    name: "Emma Rousseau",
    title: "Consultante",
    company: "Business Solutions",
    content:
      "Un accompagnement personnalisé et des conseils précieux qui ont fait toute la différence dans notre projet.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: 6,
    name: "Thomas Leroy",
    title: "Directeur Commercial",
    company: "SalesPro",
    content:
      "Des résultats concrets et mesurables. Notre chiffre d'affaires a augmenté de 40% depuis que nous utilisons ce service.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border group hover:-translate-y-1">
      <CardContent className="p-8 relative">
        {/* Quote icon */}
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/20" />

        {/* Star rating */}
        <StarRating rating={testimonial.rating} />

        {/* Testimonial text */}
        <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
          {testimonial.content}
        </p>

        {/* Author info */}
        <div className="flex items-center">
          <Avatar className="w-12 h-12 mr-4 border-2 border-gray-200">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-gray-900 font-semibold mb-1">
              {testimonial.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {testimonial.title} •{" "}
              <span className="text-blue-600">{testimonial.company}</span>
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui ont
            transformé leur business grâce à nos solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
