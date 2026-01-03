import { Text } from "react-native";

type PageTitleProps = {
  title: string;
};

export function PageTitle({ title }: Readonly<PageTitleProps>) {
  return <Text className="text-3xl font-bold text-gray-900">{title}</Text>;
}
