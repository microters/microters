"use client";

import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  FaUtensils,
  FaAlignLeft,
  FaTag,
  FaImage,
  FaVideo,
  FaUser,
  FaCalendarAlt,
  FaListAlt,
  FaGlobe,
  FaClock,
  FaUsers,
  FaFire,
  FaCarrot,
  FaListOl,
  FaStar,
  FaComment,
  FaCopy,
  FaTrash,
  FaCheck,
  FaGoogle,
  FaPlus,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] appearance-none
`;

const LegendWrapper = ({ label, icon, required, children }) => (
  <div className="relative mt-2 w-full">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const RecipeSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: "Classic Chocolate Chip Cookies",
    image: "https://example.com/cookies.jpg",
    description: "The best chocolate chip cookies recipe.",
    author: {
      "@type": "Person",
      name: "Jane Doe",
    },
    prepTime: "PT20M",
    cookTime: "PT15M",
    recipeYield: "24 cookies",
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    keywords: "",
    image: "",
    videoContentUrl: "",
    videoEmbedUrl: "",
    author: "",
    datePublished: "",
    category: "",
    cuisine: "",
    prepTime: "",
    cookTime: "",
    totalTime: "",
    servingSize: "",
    calories: "",
    fat: "",
    ingredients: [],
    steps: [],
    reviews: [],
    aggregateRatingValue: "",
    numberOfRatings: "",
    highestAllowed: "",
    lowestAllowed: "",
  });

  const [generatedSchema, setGeneratedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Ingredients Logic
  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? value : ingredient
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  // Steps Logic
  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, ""],
    });
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = formData.steps.map((step, i) =>
      i === index ? value : step
    );
    setFormData({ ...formData, steps: updatedSteps });
  };

  const removeStep = (index) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  };

  // Reviews Logic
  const addReview = () => {
    setFormData({
      ...formData,
      reviews: [
        ...formData.reviews,
        { author: "", reviewBody: "", ratingValue: "" },
      ],
    });
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = formData.reviews.map((review, i) =>
      i === index ? { ...review, [field]: value } : review
    );
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const removeReview = (index) => {
    setFormData({
      ...formData,
      reviews: formData.reviews.filter((_, i) => i !== index),
    });
  };

  // --- GENERATE FUNCTION ---
  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: formData.name,
      image: formData.image,
      description: formData.description,
      keywords: formData.keywords,
      author: {
        "@type": "Person",
        name: formData.author,
      },
      datePublished: formData.datePublished,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      totalTime: formData.totalTime,
      recipeCategory: formData.category,
      recipeCuisine: formData.cuisine,
      recipeIngredient: formData.ingredients,
      recipeInstructions: formData.steps.map((step) => ({
        "@type": "HowToStep",
        text: step,
      })),
      nutrition: {
        "@type": "NutritionInformation",
        servingSize: formData.servingSize,
        calories: formData.calories,
        fatContent: formData.fat,
      },
      aggregateRating: formData.aggregateRatingValue
        ? {
            "@type": "AggregateRating",
            ratingValue: formData.aggregateRatingValue,
            reviewCount: formData.numberOfRatings,
            bestRating: formData.highestAllowed,
            worstRating: formData.lowestAllowed,
          }
        : undefined,
      review: formData.reviews.map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.author,
        },
        reviewBody: review.reviewBody,
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.ratingValue,
        },
      })),
      video: formData.videoContentUrl
        ? {
            "@type": "VideoObject",
            name: formData.name,
            description: formData.description,
            contentUrl: formData.videoContentUrl,
            embedUrl: formData.videoEmbedUrl,
            uploadDate: formData.datePublished,
          }
        : undefined,
    };

    // Remove undefined keys
    const cleanSchema = JSON.parse(JSON.stringify(schema));
    setGeneratedSchema(cleanSchema);
    toast.success("Recipe Schema generated!");
  };

  const handleCopySchema = () => {
    if (generatedSchema) {
      navigator.clipboard.writeText(JSON.stringify(generatedSchema, null, 2));
      toast.success("JSON-LD copied to clipboard!");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      keywords: "",
      image: "",
      videoContentUrl: "",
      videoEmbedUrl: "",
      author: "",
      datePublished: "",
      category: "",
      cuisine: "",
      prepTime: "",
      cookTime: "",
      totalTime: "",
      servingSize: "",
      calories: "",
      fat: "",
      ingredients: [],
      steps: [],
      reviews: [],
      aggregateRatingValue: "",
      numberOfRatings: "",
      highestAllowed: "",
      lowestAllowed: "",
    });
    setGeneratedSchema(defaultSchema);
    toast.info("Form reset.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. General Info */}
            <div className="grid grid-cols-1 gap-6">
              <LegendWrapper label="Recipe Name" icon={<FaUtensils />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Classic Chocolate Chip Cookies"
                />
              </LegendWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Description" icon={<FaAlignLeft />}>
                  <textarea
                    className={`${baseInputStyles} h-[50px] resize-none py-3`}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Short description..."
                  />
                </LegendWrapper>
                <LegendWrapper label="Keywords" icon={<FaTag />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    placeholder="dessert, cookies, sweet"
                  />
                </LegendWrapper>
              </div>

              <LegendWrapper label="Image URL" icon={<FaImage />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/recipe.jpg"
                />
              </LegendWrapper>
            </div>

            {/* 2. Video Info */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaVideo className="text-[#f35d36]" /> Video Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Video Content URL">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="videoContentUrl"
                    value={formData.videoContentUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video.mp4"
                  />
                </LegendWrapper>
                <LegendWrapper label="Video Embed URL">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="videoEmbedUrl"
                    value={formData.videoEmbedUrl}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 3. Meta Details */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaListAlt className="text-[#f35d36]" /> Recipe Meta
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Author" icon={<FaUser />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Chef John"
                  />
                </LegendWrapper>
                <LegendWrapper label="Date Published" icon={<FaCalendarAlt />}>
                  <input
                    type="date"
                    className={baseInputStyles}
                    name="datePublished"
                    value={formData.datePublished}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
                <LegendWrapper label="Category" icon={<FaTag />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Dessert"
                  />
                </LegendWrapper>
                <LegendWrapper label="Cuisine" icon={<FaGlobe />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    placeholder="American"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 4. Times & Nutrition */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaClock className="text-[#f35d36]" /> Timings & Nutrition
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <LegendWrapper label="Prep Time">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    placeholder="PT20M"
                  />
                </LegendWrapper>
                <LegendWrapper label="Cook Time">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    placeholder="PT30M"
                  />
                </LegendWrapper>
                <LegendWrapper label="Total Time">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="totalTime"
                    value={formData.totalTime}
                    onChange={handleInputChange}
                    placeholder="PT50M"
                  />
                </LegendWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LegendWrapper label="Yields" icon={<FaUsers />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="servingSize"
                    value={formData.servingSize}
                    onChange={handleInputChange}
                    placeholder="4 servings"
                  />
                </LegendWrapper>
                <LegendWrapper label="Calories" icon={<FaFire />}>
                  <input
                    type="number"
                    className={baseInputStyles}
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    placeholder="250"
                  />
                </LegendWrapper>
                <LegendWrapper label="Fat Content">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="fat"
                    value={formData.fat}
                    onChange={handleInputChange}
                    placeholder="10g"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 5. Ingredients */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaCarrot className="text-[#f35d36]" /> Ingredients
              </h4>
              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 relative">
                    <input
                      type="text"
                      className={baseInputStyles}
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="text-red-500 hover:bg-red-50 p-3 rounded-lg border border-red-100 transition-colors"
                      onClick={() => removeIngredient(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addIngredient}
                className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-3"
              >
                <FaPlus size={12} /> Add Ingredient
              </button>
            </div>

            {/* 6. Steps */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaListOl className="text-[#f35d36]" /> Instructions (Steps)
              </h4>
              <div className="space-y-3">
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex gap-2 relative">
                    <textarea
                      className={`${baseInputStyles} h-[70px] py-3 resize-y`}
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="text-red-500 hover:bg-red-50 p-3 rounded-lg border border-red-100 transition-colors h-fit self-center"
                      onClick={() => removeStep(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addStep}
                className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-3"
              >
                <FaPlus size={12} /> Add Step
              </button>
            </div>

            {/* 7. Aggregate Rating */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaStar className="text-[#f35d36]" /> Aggregate Rating
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <LegendWrapper label="Rating Value">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="aggregateRatingValue"
                    value={formData.aggregateRatingValue}
                    onChange={handleInputChange}
                    placeholder="4.8"
                  />
                </LegendWrapper>
                <LegendWrapper label="Review Count">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="numberOfRatings"
                    value={formData.numberOfRatings}
                    onChange={handleInputChange}
                    placeholder="150"
                  />
                </LegendWrapper>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Highest Allowed">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="highestAllowed"
                    value={formData.highestAllowed}
                    onChange={handleInputChange}
                    placeholder="5"
                  />
                </LegendWrapper>
                <LegendWrapper label="Lowest Allowed">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="lowestAllowed"
                    value={formData.lowestAllowed}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 8. Reviews */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaComment className="text-[#f35d36]" /> Customer Reviews
              </h4>

              {formData.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-4 relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <LegendWrapper label="Author Name" icon={<FaUser />}>
                      <input
                        type="text"
                        className={baseInputStyles}
                        value={review.author}
                        onChange={(e) =>
                          handleReviewChange(index, "author", e.target.value)
                        }
                      />
                    </LegendWrapper>
                    <LegendWrapper label="Rating (1-5)" icon={<FaStar />}>
                      <input
                        type="number"
                        className={baseInputStyles}
                        value={review.ratingValue}
                        onChange={(e) =>
                          handleReviewChange(
                            index,
                            "ratingValue",
                            e.target.value
                          )
                        }
                      />
                    </LegendWrapper>
                  </div>
                  <LegendWrapper label="Review Body">
                    <textarea
                      className={`${baseInputStyles} h-20 resize-y`}
                      value={review.reviewBody}
                      onChange={(e) =>
                        handleReviewChange(index, "reviewBody", e.target.value)
                      }
                      placeholder="Delicious recipe!"
                    />
                  </LegendWrapper>

                  <button
                    onClick={() => removeReview(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm border border-gray-100 transition-all"
                    title="Remove Review"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addReview}
                className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-2"
              >
                <FaPlus size={12} /> Add Review
              </button>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateSchema}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              <FaWandMagicSparkles /> Generate Schema
            </button>
          </div>

          {/* RIGHT COLUMN: PREVIEW */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 h-fit">
            <div className="bg-[#15151e] p-6 rounded-2xl shadow-2xl border border-gray-800 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f35d36] animate-pulse"></span>
                  JSON-LD Preview
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopySchema}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
                    title="Copy Code"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={resetForm}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded transition-all"
                    title="Reset"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Code Display */}
              <div className="grow overflow-auto max-h-[80vh] custom-scrollbar">
                <JSONPretty
                  id="json-pretty"
                  data={generatedSchema}
                  theme={{
                    main: "line-height:1.4;color:#d4d4d4;background:transparent;overflow:auto;",
                    error:
                      "line-height:1.4;color:#f44747;background:transparent;overflow:auto;",
                    key: "color:#9cdcfe;",
                    string: "color:#ce9178;",
                    value: "color:#b5cea8;",
                    boolean: "color:#569cd6;",
                  }}
                />
              </div>

              {/* Footer Tools */}
              <div className="pt-4 mt-4 border-t border-gray-700 flex flex-col gap-2">
                <Link
                  href="https://validator.schema.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaCheck size={12} /> Validate Schema
                </Link>
                <Link
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaGoogle size={12} /> Test Rich Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeSchemaForm;
