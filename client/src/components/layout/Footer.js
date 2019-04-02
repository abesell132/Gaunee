import React from "react";

export default function Footer() {
  const today = new Date();
  return (
    <footer class="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {today.getFullYear()} Gaunee
    </footer>
  );
}
