import StoryCard from "./StoryCard";

const stories= [
  {
    name: "Elon Musk",
    src: "https://links.papareact.com/4zn",
    profile: "https://links.papareact.com/kxk",
  },
  {
    name: "Mark Zuckerberg",
    src: "https://links.papareact.com/xql",
    profile: "https://links.papareact.com/snf",
  },
]

{/* Jednotlivé "Story" se usměrní na střed s drobnou mezerou, z pole stories výše se udělá nové pole, kterému předáme potřebné atributy */}
function Stories() {
 return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((story) => (
        <StoryCard 
        key={story.src} 
        name={story.name} 
        src={story.src} 
        profile={story.profile}
        />
      ))}
    </div>
 );
}

export default Stories;