import { ScreenContainer } from "@/components/layout/screen-container";
import { LoadingState } from "@/components/loading-state";

export default function Loading() {
  return (
    <ScreenContainer narrow className="place-content-center">
      <LoadingState label="Loading Connect" />
    </ScreenContainer>
  );
}
