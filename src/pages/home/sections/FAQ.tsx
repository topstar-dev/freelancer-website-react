import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import React from "react";

const faqs = [
    {
        question: 'q1',
        answer: 'a1'
    },
    {
        question: 'q2',
        answer: 'a2'
    },
    {
        question: 'q3',
        answer: 'a3'
    },
]

const FAQ = () => {
    const { t } = useTranslation();

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box className="home-faq-section">
            <Typography className="home-section-title" style={{ textAlign: 'center', marginBottom: '95px' }}>
                {t('faq.title')}
            </Typography>
            <Box>
                {faqs.map((faq: any) => (
                    <Accordion key={faq.question} expanded={expanded === faq.question} onChange={handleChange(faq.question)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className='accordion-faq'
                        >
                            <Typography className="faq-question">
                                {t(`faq.${faq.question}`)}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="faq-answer" >
                                {t(`faq.${faq.answer}`)}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    )
}

export default FAQ;