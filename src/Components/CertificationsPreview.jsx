import { Box, Typography } from "@mui/material";
import SectionHeading from "./SectionHeading";

// Displays certifications and certificate links in the resume
function CertificationsPreview({ certifications, accent }) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <Box mb={4} >
      <SectionHeading accent={accent}>
        CERTIFICATIONS
      </SectionHeading>

      {certifications.map((certificate, index) => (
        <Box
          key={index}
          className="pdf-keep-together"
          sx={{
            mt: 2,
            mb: 3,
            borderLeft: `3px solid ${accent}`,
            pl: 2,
            py: 0.5,
          }}
        >
          {certificate.name && (
            <Typography fontWeight="bold" fontSize={15}>
              {certificate.name}
            </Typography>
          )}

          {certificate.organization && (
            <Typography
              fontSize={13}
              color="#475569"
              mt={0.5}
            >
              {certificate.organization}
            </Typography>
          )}

          {certificate.date && (
            <Typography
              fontSize={12}
              color="#64748b"
              mt={0.5}
            >
              {certificate.date}
            </Typography>
          )}

          {certificate.link && (
            <Typography
              component="a"
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              fontSize={12}
              sx={{
                color: accent,
                overflowWrap: "anywhere",
              }}
            >
              View Certificate
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default CertificationsPreview;