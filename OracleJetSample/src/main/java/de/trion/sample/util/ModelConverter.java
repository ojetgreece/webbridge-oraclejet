package de.trion.sample.util;

import de.trion.sample.model.Contract;
import netscape.javascript.JSObject;

public class ModelConverter
{
    public static Contract contractFrom (JSObject contract)
    {
        final Contract converted = new Contract();
        try
        {
            converted.setName((String)contract.getMember("name"));
            converted.setCompany((String)contract.getMember("company"));
        }
        catch(Exception jse)
        {
            System.err.println("Error converting: " + jse);
        }
        return converted;
    }
}
