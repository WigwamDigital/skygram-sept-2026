import RelationshipTypePage, { relationshipTypeMetadata } from "@/components/compatibility/RelationshipTypePage";

export const metadata = relationshipTypeMetadata("romantic");

export default function RomanticCompatibilityPage() {
  return <RelationshipTypePage type="romantic" />;
}
