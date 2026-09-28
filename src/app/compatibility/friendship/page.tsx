import RelationshipTypePage, { relationshipTypeMetadata } from "@/components/compatibility/RelationshipTypePage";

export const metadata = relationshipTypeMetadata("friendship");

export default function FriendshipCompatibilityPage() {
  return <RelationshipTypePage type="friendship" />;
}
