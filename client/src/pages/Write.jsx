import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Save, Send, Image, Bold, Italic, Link as LinkIcon } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import { uploadToCloudinary } from '../utils/cloudinary';



const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [visibility, setVisibility] = useState("Public");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const handlePublish = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/article`,
        {
          title,
          content,
          thumbnail, // base64 or direct URL
          visibility,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if required
          },
        }
      );
      console.log("Article published:", res.data);
      alert("Article published successfully!");
      navigate(`/article/${res.data.id}`); // Redirect to the new article
    } catch (err) {
      console.error("Failed to publish article", err);
    }
  };


  const handleSaveDraft = () => {
    console.log("Saving draft:", { title, content });
  };

//   const handleThumbnailUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onloadend = () => {
//     setThumbnail(reader.result); // base64 string
//   };
//   reader.readAsDataURL(file);
// };


const handleThumbnailUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const url = await uploadToCloudinary(file, 'thumbnails');
    setThumbnail(url); // Store Cloudinary URL
  } catch (error) {
    console.error('Thumbnail upload failed:', error);
    alert('Failed to upload thumbnail');
  }
};


  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Write Your Story</h1>
            <p className="text-muted-foreground">Share your thoughts with the Deep community</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              className="transition-smooth"
            >
              <Eye size={18} className="mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save size={18} className="mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              className="gradient-primary text-primary-foreground shadow-elegant"
              disabled={!title.trim() || !content.trim()}
            >
              <Send size={18} className="mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="border-border shadow-elegant">
              {!isPreview ? (
                <div className="p-8">
                  <Input
                    placeholder="Article title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-3xl font-bold border-none p-0 mb-6 placeholder:text-muted-foreground focus-visible:ring-0 bg-transparent"
                  />

                  {/* <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-border">
                    <Button variant="ghost" size="sm" className="transition-smooth">
                      <Bold size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="transition-smooth">
                      <Italic size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="transition-smooth">
                      <LinkIcon size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="transition-smooth">
                      <Image size={16} />
                    </Button>
                  </div> */}

                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    placeholder="Tell your story..."
                    className="text-xl"
                    style={{ height: '400px', marginBottom: '2rem' }}
                  />

                </div>
              ) : (
                <div className="p-8">
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt="Article thumbnail"
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                  <h1 className="text-3xl font-bold text-foreground mb-6 leading-tight">
                    {title || "Untitled Article"}
                  </h1>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                  >
                    {/* {content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed text-foreground">
                        {paragraph || <br />}
                      </p>
                    ))} */}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Publishing</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Visibility
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option>Public</option>
                    <option>Unlisted</option>
                    <option>Private</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Thumbnail
                  </label>
                  {/* <Input
                    placeholder="Image URL..."
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="transition-smooth"
                  /> */}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="transition-smooth cursor-pointer"
                  />

                  {/* <p className="text-xs text-muted-foreground mt-1">
                    Add a cover image URL for your article
                  </p> */}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tags
                  </label>
                  <Input
                    placeholder="Add tags..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="transition-smooth"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate tags with commas
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Writing Tips</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p>Start with a compelling hook to draw readers in</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p>Use subheadings to break up long sections</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p>Include personal examples to make it relatable</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p>End with a thought-provoking conclusion</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Article Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Words:</span>
                  <span className="font-medium text-foreground">
                    {content.split(" ").filter(word => word.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Characters:</span>
                  <span className="font-medium text-foreground">{content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Read time:</span>
                  <span className="font-medium text-foreground">
                    {Math.max(1, Math.ceil(content.split(" ").filter(word => word.length > 0).length / 200))} min
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
