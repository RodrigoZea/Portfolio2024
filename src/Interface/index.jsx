import { Trans, useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import Delayed from "./Delayed";
import { currentProjectAtom } from "../PreviousWorks";
import { useAtom } from "jotai";

const Section = (props) => {
    const { children } = props;
    // border-2 border-rose-500 add to class to debug
    return (
        <section className="
            h-screen w-screen min-h-screen px-4 xl:px-16
            flex flex-col items-start justify-start
            font-golos font-semibold text-purple-main text-3xl xl:text-7xl 
            select-none 
            "
        >
            {children}
        </section>
    )
}

const WelcomeSection = (props) => {
    const { t } = useTranslation();
    return(
        <Section>
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
        </Section>
    )
}

const AboutSection = () => {
    const { t } = useTranslation();
    
    return(
        <Section>
            <div className="
                w-6/12 h-full max-w-xl max-h-max
                flex flex-col items-start justify-center gap-0
                ml-[50vw] mb-12 px-8
                font-golos font-semibold select-none 
                "
            >
                <h1 className="text-purple-subtitle-dark text-5xl xl:text-6xl">
                    {t('intro.title').toLowerCase()}
                </h1>
                <motion.h1 
                    className="text-purple-main text-4xl xl:text-5xl"
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.2,
                    }}
                >
                    {t('intro.subtitle').toLowerCase()}
                </motion.h1>

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
        </Section>
    )
}

const AboutSectionMobile = () => {
    const { t } = useTranslation();
    
    return(
        <Section>
            <div className="
                w-full h-full max-h-70
                flex flex-col items-start justify-start gap-0 mb-4
                px-4 
                font-golos font-semibold select-none 
                "
            >
                <h1 className="text-purple-subtitle-dark text-4xl xl:text-6xl">
                    {t('intro.title').toLowerCase()}
                </h1>
                <motion.h1 
                    className="text-purple-main text-3xl xl:text-5xl"
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.2,
                    }}
                >
                    {t('intro.subtitle').toLowerCase()}
                </motion.h1>

                <motion.div 
                    className="
                    bg-yellow-200 w-full h-2
                    rounded-full
                    my-3
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
                        text-sea-white text-xs xl:text-lg font-light
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
                    <div className="leading-5">
                        <Trans components={{ italics: <i />, bold: <b /> }}>
                            <p>{t('intro.description')}</p>
                        </Trans>
                        
                        <p className="mt-4">{t('intro.description2')}</p>
                    </div>
                </motion.div>
            </div>
        </Section>
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

const skills = [
    {
        title: "html and css",
        level: "100"
    },
    {
        title: "sql",
        level: "80"
    },
    {
        title: "javascript",
        level: "70"
    },
    {
        title: "react",
        level: "70"
    },
    {
        title: "gdscript",
        level: "60"
    }
]


const SkillsSection = () => {
    const { t } = useTranslation();
    return(
        <Section>   
            <motion.div className="w-full h-full" whileInView={"visible"}> 
                <h1>{t('skills.title').toLowerCase()}</h1>            
                <div className="mt-14 space-y-4 pr-8">
                    {skills.map((skill, index) => (
                        <div key={index}>
   
                            <motion.div
                                className="flex flex-row items-center justify-between gap-0 
                                        text-xl xl:text-3xl 
                                        font-bold text-purple-subtitle-dark"
                                initial={{
                                    opacity: 0,
                                }}
                                variants={{
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            duration: 1,
                                            delay: 1 + index * 0.2
                                        }
                                    }
                                }}
                            >
                                <h3>{skill.title}</h3>
                                <h3>{skill.level}%</h3>
                            </motion.div>

                            <div className="h-2 xl:h-5 w-full bg-purple-dark rounded-full mt-2">
                                <motion.div
                                    className="h-full bg-yellow-200 rounded-full"
                                    style={{ width: `${skill.level}%`}}
                                    initial={{
                                        scaleX: 0,
                                        originX: 0,
                                    }}
                                    variants={{
                                        visible: {
                                            scaleX: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 1 + index*0.2
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex flex-row text-lg space-x-2
                xl:space-x-4 xl:text-4xl">
                    <h3>
                        {t("languages.title").toLowerCase()}
                    </h3>
                    <h3 className="text-yellow-200">
                        {t("languages.list").toLowerCase()}
                    </h3>
                </div>  
            </motion.div>
        </Section>
    )
}

const ProjectsSection = () => {
    const { t } = useTranslation();
    const projectsLength = 6;
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom)

    const nextProject = () => {
        setCurrentProject((currentProject+1) % projectsLength)
    }

    const previousProject = () => {
        setCurrentProject((currentProject-1+projectsLength) % projectsLength)
    }


    return(
        <Section>
            <div className="
                w-full h-full pr-8 py-48
                flex flex-col justify-between 
            ">
                <h1>{t('projects.title').toLowerCase()}</h1>
                <div className="flex w-full gap-8 items-center justify-between xl:px-8 text-3xl xl:text-6xl">
                    <button
                        className="hover:text-indigo-600 transition-colors flex flex-row items-center gap-8"
                        onClick={previousProject}
                    >
                        <div>
                            {'<'}
                        </div>
                        <div className="mb-4">previous</div>
                    </button>
                    <button
                        className="hover:text-indigo-600 transition-colors flex flex-row items-center gap-8"
                        onClick={nextProject}
                    >                       
                        <div className="mb-4">next</div>
                        <div>
                            {'>'}
                        </div>
                    </button>
                </div>
            </div>
        </Section>
    )
}

const ContactSection = () => {
    const { t } = useTranslation();
    return(
        <Section>
            <h1>{t('contact.title').toLowerCase()}</h1>
        </Section>
    )
}

export default function Interface(){
    const isMobile = window.innerWidth < 768;

    return(
        <div className="flex flex-col w-screen">
            <WelcomeSection />
            {isMobile ? <AboutSectionMobile/> :<AboutSection />}
            <InterestsSection />
            <SkillsSection />
            <ProjectsSection />         
            <ContactSection />       
        </div>
    )
}