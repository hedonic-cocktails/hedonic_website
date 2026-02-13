import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  options: { label: string; scores: { ds: number; oj: number; ms: number } }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What kind of evening are you in the mood for?",
    options: [
      { label: "Something fun and vibrant", scores: { ds: 3, oj: 1, ms: 0 } },
      { label: "Cozy and nostalgic", scores: { ds: 0, oj: 3, ms: 1 } },
      { label: "Sophisticated and contemplative", scores: { ds: 0, oj: 0, ms: 3 } },
    ],
  },
  {
    id: 2,
    question: "Pick a flavor that speaks to you.",
    options: [
      { label: "Bright berry with a citrus edge", scores: { ds: 3, oj: 1, ms: 0 } },
      { label: "Creamy orange and vanilla", scores: { ds: 0, oj: 3, ms: 0 } },
      { label: "Smoky with a hint of sweetness", scores: { ds: 0, oj: 0, ms: 3 } },
    ],
  },
  {
    id: 3,
    question: "How do you take your coffee?",
    options: [
      { label: "Iced with something fruity or sweet", scores: { ds: 3, oj: 1, ms: 0 } },
      { label: "A creamy latte or cappuccino", scores: { ds: 1, oj: 3, ms: 0 } },
      { label: "Black or with a splash of something bold", scores: { ds: 0, oj: 0, ms: 3 } },
    ],
  },
  {
    id: 4,
    question: "You're at a restaurant. What catches your eye?",
    options: [
      { label: "A refreshing starter with bright, tangy flavors", scores: { ds: 3, oj: 0, ms: 1 } },
      { label: "A rich, creamy dessert", scores: { ds: 0, oj: 3, ms: 0 } },
      { label: "Something charcoal-grilled with depth", scores: { ds: 0, oj: 0, ms: 3 } },
    ],
  },
  {
    id: 5,
    question: "What's your ideal vacation destination?",
    options: [
      { label: "A lively beach town with nightlife", scores: { ds: 3, oj: 1, ms: 0 } },
      { label: "A sunny coastal village with markets", scores: { ds: 1, oj: 3, ms: 0 } },
      { label: "A remote mountain retreat", scores: { ds: 0, oj: 0, ms: 3 } },
    ],
  },
];

const results: Record<string, { slug: string; name: string; tagline: string; description: string; color: string; imageUrl: string }> = {
  ds: {
    slug: "dirty-shirley",
    name: "Dirty Shirley",
    tagline: "Clarified, carbonated, and dangerously smooth.",
    description: "You gravitate toward things that are vibrant, fun, and unapologetically bold. The Dirty Shirley's bright grenadine sweetness, fresh lime, and sparkling effervescence match your energy perfectly.",
    color: "#c94060",
    imageUrl: "/images/dirty-shirley.png",
  },
  oj: {
    slug: "orange-julius",
    name: "Orange Julius",
    tagline: "Creamy citrus indulgence, clarified and sparkling.",
    description: "You appreciate warmth, comfort, and a touch of nostalgia. The Orange Julius wraps creamy vanilla and fresh orange in sparkling elegance — familiar flavors in an entirely new, luxurious form.",
    color: "#e8a040",
    imageUrl: "/images/orange-julius.png",
  },
  ms: {
    slug: "mezcal-soda",
    name: "Mezcal Soda",
    tagline: "Smoky, bright, and brilliantly clear.",
    description: "You crave depth and complexity. The Mezcal Soda's smoky character, tempered by bright lemon and a whisper of vanilla, rewards your refined palate with a long, smoldering finish.",
    color: "#c4a050",
    imageUrl: "/images/mezcal-soda.png",
  },
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ ds: 0, oj: 0, ms: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const option = questions[currentQuestion].options[optionIndex];
    const newScores = {
      ds: scores.ds + option.scores.ds,
      oj: scores.oj + option.scores.oj,
      ms: scores.ms + option.scores.ms,
    };
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const getResult = () => {
    const max = Math.max(scores.ds, scores.oj, scores.ms);
    if (scores.ds === max) return results.ds;
    if (scores.oj === max) return results.oj;
    return results.ms;
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScores({ ds: 0, oj: 0, ms: 0 });
    setSelectedOption(null);
    setShowResult(false);
  };

  const result = getResult();
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back-quiz">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mt-8 mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-quiz-label">
            Find Your Bottle
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-quiz-title">
            Which Hedonic Speaks to You?
          </h1>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
            Five quick questions to discover your perfect match.
          </p>
        </motion.div>

        {!showResult && (
          <div className="w-full h-0.5 bg-border/30 rounded-full mb-12">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              data-testid="progress-bar"
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-8">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3" data-testid="text-question-count">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <h2 className="font-display text-2xl md:text-3xl tracking-wide" data-testid="text-question">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, i) => (
                  <Card
                    key={i}
                    className={`p-6 cursor-pointer transition-all duration-300 border-border/30 hover-elevate ${selectedOption === i ? "border-primary/60 bg-primary/5" : "bg-card/50"}`}
                    onClick={() => selectedOption === null ? handleSelect(i) : undefined}
                    data-testid={`option-${i}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${selectedOption === i ? "border-primary bg-primary" : "border-border/50"}`}>
                        {selectedOption === i && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-primary-foreground"
                          />
                        )}
                      </div>
                      <span className="font-body text-base">{option.label}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="p-8 md:p-12 border-primary/30 bg-card/50 text-center">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6" data-testid="text-result-label">
                  Your Perfect Match
                </p>

                <div className="w-48 h-64 mx-auto mb-8 relative">
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="w-full h-full object-contain"
                    data-testid="img-result-bottle"
                  />
                </div>

                <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-2" data-testid="text-result-name">
                  {result.name}
                </h2>
                <p className="font-display text-base italic text-primary mb-6" data-testid="text-result-tagline">
                  {result.tagline}
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10" data-testid="text-result-description">
                  {result.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href={`/product/${result.slug}`}>
                    <Button className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-view-result">
                      View Bottle
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={restart} className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-retake-quiz">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
