import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { TestResults } from "../pages/api/tests";

interface ITestResults {
  testResults: TestResults;
  doFirstTest: boolean;
  doSecondTest: boolean;
  doThirdTest: boolean;
  getPercentageTestsSucceeded: () => number;
}

const TestResults = ({
  testResults,
  doFirstTest,
  doSecondTest,
  doThirdTest,
  getPercentageTestsSucceeded,
}: ITestResults) => {
  return testResults?.firstTest !== undefined ||
    testResults?.secondTest !== undefined ||
    testResults?.thirdTest !== undefined ? (
    <Box p="5" maxW="600px" borderWidth="2px" borderRadius={5}>
      <Flex align="baseline" mt={2} mb={3}>
        <HStack>
          <Badge colorScheme="blue" fontSize="lg">
            Résultats
          </Badge>
          <CircularProgress
            value={getPercentageTestsSucceeded() || 0}
            size="50px"
            color="green.400"
          >
            <CircularProgressLabel>
              {getPercentageTestsSucceeded()}%
            </CircularProgressLabel>
          </CircularProgress>
        </HStack>
      </Flex>

      {doFirstTest && testResults?.firstTest != undefined && (
        <Text>
          Cas #1{" "}
          <Tag colorScheme="blue" size="sm">
            Navigation
          </Tag>
          {testResults.firstTest ? (
            <Tag colorScheme="green" size="sm" ml={2}>
              Réussi <CheckIcon ml={2} />
            </Tag>
          ) : (
            <Tag colorScheme="red" size="sm" ml={2}>
              Non réussi <SmallCloseIcon ml={2} />
            </Tag>
          )}
        </Text>
      )}

      {doSecondTest && testResults?.secondTest != undefined && (
        <Text>
          Cas #2{" "}
          <Tag colorScheme="blue" size="sm">
            Titre sur la page
          </Tag>
          {testResults.secondTest ? (
            <Tag colorScheme="green" size="sm" ml={2}>
              Réussi <CheckIcon ml={2} />
            </Tag>
          ) : (
            <Tag colorScheme="red" size="sm" ml={2}>
              Non réussi <SmallCloseIcon ml={2} />
            </Tag>
          )}
        </Text>
      )}

      {doThirdTest && testResults?.thirdTest != undefined && (
        <Text>
          Cas #3{" "}
          <Tag colorScheme="blue" size="sm">
            Authentification
          </Tag>
          {testResults.thirdTest ? (
            <Tag colorScheme="green" size="sm" ml={2}>
              Réussi <CheckIcon ml={2} />
            </Tag>
          ) : (
            <Tag colorScheme="red" size="sm" ml={2}>
              Non réussi <SmallCloseIcon ml={2} />
            </Tag>
          )}
        </Text>
      )}
    </Box>
  ) : (
    <p>No results</p>
  );
};

export default TestResults;
