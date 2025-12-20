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

interface ResetPasswordEmailProps {
  username: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({
  username,
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />

      {/* Appears as email preview text */}
      <Preview>Password reset access link generated</Preview>

      {/* MAIN WRAPPER */}
      <Container
        style={{
          backgroundColor: "#f7f9f8",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #e0e3e2",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          fontFamily: "Inter, Arial, sans-serif",
          color: "#202020",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <Heading
          style={{
            fontSize: "24px",
            fontWeight: 500,
            marginBottom: "4px",
            opacity: 0.85,
            textAlign: "left",
          }}
        >
          Password Reset Requested
        </Heading>

        {/* TIMESTAMP */}
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
          received a request to reset the password for your MindsViewMsg
          account. A secure access link has been generated for this action.
        </Text>

        <Text
          style={{
            lineHeight: "1.7",
            fontSize: "14px",
            marginBottom: "26px",
            color: "#3a3a3a",
          }}
        >
          This link allows you to set a new password. For security reasons, it
          will expire automatically after a short time window.
        </Text>

        {/* RESET BUTTON */}
        <Section style={{ textAlign: "center", marginBottom: "32px" }}>
          <Button
            href={resetUrl}
            style={{
              backgroundColor: "#e8eceb",
              color: "#1f1f1f",
              padding: "14px 22px",
              borderRadius: "6px",
              border: "1px solid #bfc4c3",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
              maxWidth: "100%",
            }}
          >
            Reset Password
          </Button>
        </Section>

        {/* FALLBACK LINK */}
        <Text
          style={{
            fontSize: "12px",
            color: "#6f6f6f",
            lineHeight: "1.6",
            marginBottom: "24px",
            wordBreak: "break-word",
          }}
        >
          If the button does not work, copy and paste the following link into
          your browser:
          <br />
          <span style={{ color: "#2f2f2f" }}>{resetUrl}</span>
        </Text>

        {/* FOOTER WARNING */}
        <Text
          style={{
            borderTop: "1px solid #e0e3e2",
            paddingTop: "16px",
            fontSize: "12px",
            color: "#7a7a7a",
            lineHeight: "1.6",
          }}
        >
          If you did not request this password reset, you can safely ignore this
          email. No changes will be made to your account unless the link is
          used.
        </Text>
      </Container>
    </Html>
  );
}
