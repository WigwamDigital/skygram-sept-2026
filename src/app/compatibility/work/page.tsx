import RelationshipTypePage, { relationshipTypeMetadata } from "@/components/compatibility/RelationshipTypePage";

export const metadata = relationshipTypeMetadata("work");

export default function WorkCompatibilityPage() {
  return <RelationshipTypePage type="work" />;
}
