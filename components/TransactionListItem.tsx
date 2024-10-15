import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Category, Transaction } from "../types";
import Card from "./ui/Card";
import { AntDesign } from "@expo/vector-icons";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { categoryColors, categoryEmojies } from "../constants";

interface TransactionListItemProps {
	transaction: Transaction;
	categoryInfo: Category | undefined;
}

export default function TransactionListItem({
	transaction,
	categoryInfo,
}: TransactionListItemProps) {
	const iconName =
		transaction.type === "Expense" ? "minuscircle" : "pluscircle";
	const color = transaction.type === "Expense" ? "red" : "green";
	const categoryColor = categoryColors[categoryInfo?.name ?? "Default"];
	const emoji = categoryEmojies[categoryInfo?.name ?? "Default"];
	return (
		<Card>
			<Amount
				amount={transaction.amount}
				color={color}
				iconName={iconName}
			/>
		</Card>
	);
}

function Amount({
	iconName,
	color,
	amount,
}: {
	iconName: "minuscircle" | "pluscircle";
	color: string;
	amount: number;
}) {
	return (
		<View style={styles.row}>
			<AntDesign name={iconName} size={18} color={color} />
			<AutoSizeText
				fontSize={32}
				mode={ResizeTextMode.max_lines}
				numberOfLines={1}
				style={[styles.amount, { maxWidth: "80%" }]}
			>
				${amount}
			</AutoSizeText>
		</View>
	);
}

const styles = StyleSheet.create({
	amount: {
		fontSize: 32,
		fontWeight: "800",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	categoryContainer: {
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 3,
		alignSelf: "flex-start",
	},
	categoryText: {
		fontSize: 12,
	},
});
