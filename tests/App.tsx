/// <reference types="nativewind/types" />
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import 'reflect-metadata';
import 'react-native-get-random-values';

import { registerBaseTests, runTests } from './tests/index';
import { registerTypeORMTests } from './tests/type-orm/typeorm.spec';
// import {registerTypeORMTests} from './tests/typeorm.spec';

export default function App() {
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    setResults([]);
    runTests(
      registerBaseTests
      // registerTypeORMTests
    ).then((results) => {
      console.log(JSON.stringify(results, null, '\t'));
      setResults(results);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <ScrollView className="p-4">
        <Text className="font-bold text-blue-500 text-lg text-center">RN Quick SQLite Test Suite</Text>
        {results.map((r: any, i: number) => {
          if (r.type === 'grouping') {
            return (
              <Text key={i} className="mt-3 font-bold text-white">
                {r.description}
              </Text>
            );
          }

          if (r.type === 'incorrect') {
            return (
              <Text key={i} className="mt-1 text-white">
                🔴 {r.description}: {r.errorMsg}
              </Text>
            );
          }

          return (
            <Text key={i} className="mt-1 text-white">
              🟢 {r.description}
            </Text>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
