import {
  Html,
  Head,
  Preview,
  Section,
  Text,
  Heading,
  Container,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Your access code has been generated</Preview>

      {/* MAIN WRAPPER – responsive on all devices */}
      <Container
        style={{
          backgroundColor: "#f7f9f8",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #e0e3e2",
          width: "100%",
          maxWidth: "600px", // scales up to 4k safely
          margin: "0 auto",
          fontFamily: "Inter, Arial, sans-serif",
          color: "#202020",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER TEXT */}
        <Heading
          style={{
            fontSize: "24px",
            fontWeight: 500,
            marginBottom: "4px",
            opacity: 0.85,
            textAlign: "left",
          }}
        >
          Verification Requested at MindsViewMsg
        </Heading>

        <Text
          style={{
            fontSize: "12px",
            color: "#8c8c8c",
            marginBottom: "24px",
            letterSpacing: "0.4px",
          }}
        >
          timestamp: {new Date().toUTCString()}
        </Text>

        {/* BODY MESSAGE */}
        <Text
          style={{
            lineHeight: "1.7",
            fontSize: "15px",
            marginBottom: "22px",
            wordBreak: "break-word",
          }}
        >
          Hello <strong style={{ fontWeight: 500 }}>{username}</strong>, we
          detected an attempt to access your account. The system generated an
          authentication code. You are expected to use it.
        </Text>

        {/* RESPONSIVE OTP BOX */}
        <Section
          style={{
            background: "#e8eceb",
            border: "1px dashed #bdbfbe",
            padding: "20px",
            borderRadius: "6px",
            marginBottom: "28px",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Text
            style={{
              fontSize: "28px",
              letterSpacing: "8px",
              fontWeight: 600,
              color: "#242424",
              margin: 0,
            }}
          >
            {otp}
          </Text>

          <Text
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#6f6f6f",
              letterSpacing: "0.8px",
            }}
          >
            validity window has begun
          </Text>
        </Section>

        {/* RESPONSIVE BUTTON */}
        {/* <Section style={{ textAlign: "center", width: "100%" }}>
          <Button
            href="#"
            style={{
              backgroundColor: "#dfe3e2",
              color: "#1f1f1f",
              padding: "12px 20px",
              borderRadius: "4px",
              border: "1px solid #bfc4c3",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block", // button scales
              width: "auto",
              maxWidth: "100%",
            }}
          >
            Verify Identity
          </Button>
        </Section> */}

        {/* FOOTER */}
        <Text
          style={{
            borderTop: "1px solid #e0e3e2",
            paddingTop: "16px",
            fontSize: "12px",
            color: "#7a7a7a",
            lineHeight: "1.6",
            wordBreak: "break-word",
          }}
        >
          If this request was not made by you, please observe your account for
          further activity. Unexpected actions can still occur.
        </Text>
      </Container>
    </Html>
  );
}
