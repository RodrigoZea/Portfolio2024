import { Trans, useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import Delayed from "./Delayed";


const Section = (props) => {
    const { children } = props;

    return (
        <section className="
            h-screen w-screen p-8 max-w-screen-2xl
            flex flex-col items-start justify-center
            font-golos font-semibold text-purple-main text-5xl xl:text-7xl 
            "
        >
            {children}
        </section>
    )
}

const WelcomeSection = (props) => {
    const { t } = useTranslation();
    return(
        <Delayed>
            <div
                className="
                    h-screen w-screen
                    flex flex-col items-center justify-center
                    select-none 
                    
                "
            >
                <a
                    className="
                    font-golos text-5xl xl:text-7xl  font-semibold text-purple-main
                    "
                >
                    {t('presentation.title1')}
                </a>       
                <a
                    className="
                    font-golos text-5xl xl:text-7xl font-semibold text-purple-main mb-20
                    "
                >
                    {t('presentation.title2')}
                </a>        
            </div>
        </Delayed>
    )
}

const AboutSection = () => {
    const { t } = useTranslation();
    
    return(
        <div className="
            w-6/12 max-w-2xl
            flex flex-col items-start justify-center gap-0
            mt-[52rem] ml-[50vw]
            font-golos font-semibold select-none 
            "
        >
            <h1 className="text-purple-subtitle-dark text-5xl xl:text-6xl">
                {t('intro.title').toLowerCase()}
            </h1>
            <h1 className="text-purple-main text-4xl xl:text-5xl">
                {t('intro.subtitle').toLowerCase()}
            </h1>

            <motion.div 
                className="
                bg-yellow-200 w-full h-2
                rounded-full
                my-6
                "
                initial={{
                    opacity: 0,
                    x: -100
                }}
                whileInView={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 1,
                    delay: 0.6,
                }}
            />

            <motion.div 
                className="
                    text-sea-white text-sm xl:text-lg font-light
                "
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1,
                    delay: 0.6,
                }}
            >
                <div className="leading-6">
                    <Trans components={{ italics: <i />, bold: <b /> }}>
                        <p>{t('intro.description')}</p>
                    </Trans>
                    
                    <p className="mt-4">{t('intro.description2')}</p>
                </div>
            </motion.div>
        </div>
    )
}

const InterestsSection = () => {
    const { t } = useTranslation();
    return(
        <Section>
            <h1>{t('interests.title').toLowerCase()}</h1>
        </Section>
    )
}

const SkillsSection = () => {
    const { t } = useTranslation();
    return(
        <Section>
            <h1>{t('skills.title').toLowerCase()}</h1>
        </Section>
    )
}

const ProjectsSection = () => {
    const { t } = useTranslation();
    return(
        <Section>
            <h1>{t('projects.title').toLowerCase()}</h1>
        </Section>
    )
}

export default function Interface(){
    return(
        <div className="flex flex-col w-screen">
            <WelcomeSection />
            <AboutSection />
            <InterestsSection />
            <SkillsSection />
            <ProjectsSection />               
        </div>
    )
}