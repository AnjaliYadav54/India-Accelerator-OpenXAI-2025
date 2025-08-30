export const metadata = {
  title: "CogNet",
  description: "Cognitive Network Chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a1a, #333333, #1a1a1a)", // gradient instead of image
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: "600px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
