import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { getAllProviders, getProviderById } from "@/lib/profiles";

export function generateStaticParams() {
  return getAllProviders().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = getProviderById(id);
  return { title: p ? `Request a Booking with ${p.name}` : "Request a Booking" };
}

export default async function BookingPage({ params }) {
  const { id } = await params;
  const p = getProviderById(id);
  if (!p) notFound();

  return (
    <div className="wrap section" style={{ paddingTop: "2rem" }}>
      <div className="sec-head" style={{ marginBottom: "1.75rem" }}>
        <h2>Request a booking</h2>
        <p>Choose a date and duration. A deposit reserves your booking.</p>
      </div>
      <BookingForm p={p} />
    </div>
  );
}
