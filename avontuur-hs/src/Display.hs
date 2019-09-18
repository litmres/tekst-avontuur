module Display (printDescription, printAction) where
import Types

printDisplayData :: DisplayData -> IO ()
printDisplayData (Text text) =
  case text of
    "" -> putStrLn "\n"
    _ -> putStr text

printDisplayData (Color code) =
  putStr ""

printDisplayData (Delay code) =
  putStr ""

printDescription :: Description -> IO ()
printDescription (Description _ displayData _) = do
  mapM_ printDisplayData displayData
  putStrLn ""

printAction :: Action -> Int -> IO ()
printAction (Action _ _ _ text _) num = do
  putStrLn (show num ++ ") " ++ text)

