import RelationshipTypePage, { relationshipTypeMetadata } from "@/components/compatibility/RelationshipTypePage";

export const metadata = relationshipTypeMetadata("family");

export default function FamilyCompatibilityPage() {
  return <RelationshipTypePage type="family" />;
}
