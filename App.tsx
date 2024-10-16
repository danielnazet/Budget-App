import { ActivityIndicator, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { useState } from "react";
import * as React from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
	const dbName = "mySQLiteDB.db";
	const dbAsset = require("./assets/mySQLiteDB.db");
	const dbUri = Asset.fromModule(dbAsset).uri;
	const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

	const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
	if (!fileInfo.exists) {
		await FileSystem.makeDirectoryAsync(
			`${FileSystem.documentDirectory}SQLite`,
			{ intermediates: true }
		);
		await FileSystem.downloadAsync(dbUri, dbFilePath);
	}
};

export default function App() {
	const [dbLoaded, setDbLoaded] = useState<boolean>(false);

	React.useEffect(() => {
		loadDatabase()
			.then(() => setDbLoaded(true))
			.catch((e) => console.error(e));
	}, []);
	if (!dbLoaded)
		return (
			<View style={{ flex: 1 }}>
				<ActivityIndicator size={"large"} />
				<Text>Loading Database...</Text>
			</View>
		);

	return (
		<NavigationContainer>
			<React.Suspense>
				<SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
					<Stack.Navigator>
						<Stack.Screen
							name="Home"
							component={Home}
							options={{
								headerTitle: "Budget Home App",
								headerLargeTitle: true,
							}}
						/>
					</Stack.Navigator>
				</SQLiteProvider>
			</React.Suspense>
		</NavigationContainer>
	);
}
