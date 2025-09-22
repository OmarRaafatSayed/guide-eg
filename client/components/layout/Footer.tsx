export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} NileNavigator. Travel smart. Stay safe.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <a href="#" className="hover:text-foreground">
            Safety
          </a>
        </div>
      </div>
    </footer>
  );
}
