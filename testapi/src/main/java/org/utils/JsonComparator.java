package org.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class JsonComparator {
    /**
     * Recursively compares two JSON nodes and returns a JSON node indicating the differences.
     * <p>
     * This method checks that all fields present in the first JSON node (node1) exist and have the same value in the second JSON node (node2). The comparison is performed recursively for nested objects and arrays.
     *
     * @param node1 The first JSON node to compare. This is the reference node.
     * @param node2 The second JSON node to compare. This method checks that this node contains all fields from the first node with the same values.
     * @param result A JSON node that stores the result of the comparison.
     * @return A JSON node indicating where the two nodes differ. If a field is present in node1 but absent or different in node2, the value of this field in the result node is 'false'. Otherwise, the value is 'true'.
     */
    public static JsonNode compareJson(JsonNode node1, JsonNode node2, ObjectNode result) {
        if (node1.isArray() && node2.isArray()) {
            ArrayNode array1 = (ArrayNode) node1;
            ArrayNode array2 = (ArrayNode) node2;
            ArrayNode arrayResult = result.arrayNode();
            for (int i = 0; i < array1.size(); i++) {
                if (array1.get(i).isObject() && array2.get(i).isObject()) {
                    arrayResult.add(compareJson(array1.get(i), array2.get(i), result.objectNode()));
                } else {
                    arrayResult.add(array1.get(i).equals(array2.get(i)));
                }
            }
            return arrayResult;
        } else {
            node1.fieldNames().forEachRemaining(fieldName -> {
                JsonNode value1 = node1.get(fieldName);
                JsonNode value2 = node2.get(fieldName);

                if (value1.isObject()) {
                    if (value2 != null && value2.isObject()) {
                        result.set(fieldName, compareJson(value1, value2, result.objectNode()));
                    } else {
                        result.put(fieldName, false);
                    }
                } else if (value1.isArray() && value2.isArray()) {
                    ArrayNode array1 = (ArrayNode) value1;
                    ArrayNode array2 = (ArrayNode) value2;
                    ArrayNode arrayResult = result.arrayNode();
                    for (int i = 0; i < array1.size(); i++) {
                        if (array1.get(i).isObject() && array2.get(i).isObject()) {
                            arrayResult.add(compareJson(array1.get(i), array2.get(i), result.objectNode()));
                        } else {
                            arrayResult.add(array1.get(i).equals(array2.get(i)));
                        }
                    }
                    result.set(fieldName, arrayResult);
                } else {
                    result.put(fieldName, value1.equals(value2));
                }
            });

            return result;
        }
    }


    @Test
    public void testCompareJson_SameJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = "{\"a\": 1, \"b\": 2}";
        String expectedJson = "{\"a\": true, \"b\": true}";

        JsonNode node = mapper.readTree(json);
        JsonNode expected = mapper.readTree(expectedJson);
        JsonNode comparedResult = JsonComparator.compareJson(node, node, mapper.createObjectNode());

        assertEquals(expected, comparedResult);
    }

    @Test
    public void testCompareJson_DifferentJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json1 = "{\"a\": 1, \"b\": 2}";
        String json2 = "{\"a\": 1, \"b\": 3}";
        String expectedJson = "{\"a\": true, \"b\": false}";

        JsonNode node1 = mapper.readTree(json1);
        JsonNode node2 = mapper.readTree(json2);
        JsonNode expected = mapper.readTree(expectedJson);

        JsonNode comparedResult = JsonComparator.compareJson(node1, node2, mapper.createObjectNode());

        assertEquals(expected, comparedResult);
    }


    @Test
    public void testCompareJson_NestedJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json1 = "{\"a\": {\"x\": 1, \"y\": 2}, \"b\": 3}";
        String json2 = "{\"a\": {\"x\": 1, \"y\": 2}, \"b\": 3}";
        String expectedJson = "{\"a\": {\"x\": true, \"y\": true}, \"b\": true}";


        JsonNode node1 = mapper.readTree(json1);
        JsonNode node2 = mapper.readTree(json2);
        JsonNode expected = mapper.readTree(expectedJson);

        JsonNode comparedResult = JsonComparator.compareJson(node1, node2, mapper.createObjectNode());

        assertEquals(expected, comparedResult);
    }

    @Test
    public void testCompareJson_Arrays() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json1 = "[1, 2, 3]";
        String json2 = "[1, 2, 3]";
        String expectedJson = "[true, true, true]";

        JsonNode node1 = mapper.readTree(json1);
        JsonNode node2 = mapper.readTree(json2);
        JsonNode expected = mapper.readTree(expectedJson);

        JsonNode comparedResult = JsonComparator.compareJson(node1, node2, mapper.createObjectNode());

        assertEquals(expected, comparedResult);
    }

    @Test
    public void testCompareJson_DifferentArrays() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json1 = "[1, 2, 3]";
        String json2 = "[1, 2, 4]";
        String expectedJson = "[true, true, false]";

        JsonNode node1 = mapper.readTree(json1);
        JsonNode node2 = mapper.readTree(json2);
        JsonNode expected = mapper.readTree(expectedJson);

        JsonNode comparedResult = JsonComparator.compareJson(node1, node2, mapper.createObjectNode());

        assertEquals(expected, comparedResult);
    }
}
