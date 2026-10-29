import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import FeatureLineCard from "../../Common/GreenCards/GreenLineCard";
import classes from "./GreenLineCard.module.css";
import Button from "@/components/Common/Button/Button";
export default function GreenCards() {
    return(
        <section className={classes.releaseSection}>
            <div className={classes.inner}></div>
             <SectionHeader
                title="Three ways of working together. "
                highlight="One quality."
                description="Product releases shouldn’t be a shot in the dark. You want quick, bug-free releases without the endless worry of what might go wrong in production."
            />
            <div className={classes.featuresGrid}>
                <FeatureLineCard
                title="Dedicated Team"
                description="A long-term QA team that becomes a part of your crew, learns your product inside out, and takes complete ownership of quality."
                />
                <FeatureLineCard
                title="Project Based"
                description="Just the experts you need to carry you through a release, a milestone, or a goal. The short-term QA support will help you get it just right!"
                />
                <FeatureLineCard
                title="Staff Augmentation"
                description="No hiring headaches. Get the best QA litter and leverage their experience and expertise to ensure unmatched quality."
                />
            </div>
            <div className={classes.buttonContainer}>
                <Button href="/Contact-us" variant="primary" size="cta">
                     Talk To An Expert 
                </Button>
            </div>
            
        </section>
        
    )
}
