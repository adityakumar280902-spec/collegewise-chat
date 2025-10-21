import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Send, MessageCircle, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockSeniors = [
  {
    id: 1,
    name: "Rahul Sharma",
    college: "IIT Bombay",
    branch: "Computer Science",
    year: "Final Year",
    location: "Mumbai",
    online: true
  },
  {
    id: 2,
    name: "Priya Patel",
    college: "BITS Pilani",
    branch: "Electronics",
    year: "Alumni (2022)",
    location: "Pilani",
    online: false
  },
  {
    id: 3,
    name: "Arjun Kumar",
    college: "NIT Trichy",
    branch: "Mechanical",
    year: "3rd Year",
    location: "Trichy",
    online: true
  }
];

const mockMessages = [
  {
    id: 1,
    sender: "senior",
    text: "Hey! Welcome! How can I help you with your college decision?",
    time: "10:30 AM"
  },
  {
    id: 2,
    sender: "student",
    text: "Hi! I wanted to know about the placement opportunities and campus life.",
    time: "10:32 AM"
  },
  {
    id: 3,
    sender: "senior",
    text: "Great question! Our placement record is excellent. About 95% of students get placed. The campus life is vibrant with lots of clubs and activities.",
    time: "10:33 AM"
  }
];

const Seniors = () => {
  const [selectedSenior, setSelectedSenior] = useState(mockSeniors[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Talk to Seniors</h1>
              <p className="text-sm text-muted-foreground">
                Get real insights from current students and alumni
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Seniors List */}
          <Card className="lg:col-span-1 bg-card border-border overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search seniors..."
                  className="pl-9 bg-background"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mockSeniors.map((senior) => (
                <div
                  key={senior.id}
                  className={`p-4 border-b border-border cursor-pointer transition-colors ${
                    selectedSenior.id === senior.id
                      ? 'bg-primary/10'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedSenior(senior)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold truncate">{senior.name}</h4>
                        {senior.online && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {senior.college}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {senior.branch}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {senior.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 bg-card border-border overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedSenior.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {selectedSenior.college}
                    {selectedSenior.online && (
                      <>
                        <span>•</span>
                        <span className="text-primary">Online</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Start Video Call
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'student'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === 'student'
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-background"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setMessage("");
                    }
                  }}
                />
                <Button className="gap-2 glow-primary">
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Seniors;
